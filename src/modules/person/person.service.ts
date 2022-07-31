import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Person } from 'src/modules/person/entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: Repository<Person>) {}

  async create(createPersonDto: CreatePersonDto) {
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
}
