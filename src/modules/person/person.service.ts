import { DeleteResult, Repository } from '@app/in-memory-repository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: Repository<Person>) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const personAlreadyExists = await this.personRepository.findOne({
      cpf: createPersonDto.cpf,
    });

    if (personAlreadyExists) {
      throw new ConflictException('Person already exists!');
    }

    return this.personRepository.create(createPersonDto);
  }

  async findOne(cpf: string): Promise<Person> {
    const person = await this.personRepository.findOne({ cpf });

    if (!person) {
      throw new NotFoundException('Person not found.');
    }

    return person;
  }

  clean(): Promise<DeleteResult> {
    return this.personRepository.clean();
  }
}
