import { DeleteResult, Repository } from '@app/in-memory-repository';
import { Injectable } from '@nestjs/common';
import { Person } from '../person/entities/person.entity';
import { PersonService } from '../person/person.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { Relationship } from './entities/relationship.entity';

@Injectable()
export class RelationshipService {
  constructor(
    private readonly relationshipRepository: Repository<Relationship>,
    private readonly personService: PersonService,
  ) {}

  async create({
    personCpf,
    followsCpf,
  }: CreateRelationshipDto): Promise<Relationship> {
    const person = await this.personService.findOne(personCpf);
    const follows = await this.personService.findOne(followsCpf);

    return this.relationshipRepository.create({ person, follows });
  }

  async findAllFriendsByCpf(cpf: string): Promise<Person[]> {
    const relationships = await this.relationshipRepository.find();

    return relationships
      .filter((relationship) => relationship.person.cpf === cpf)
      .map((relationship) => relationship.follows);
  }

  clean(): Promise<DeleteResult> {
    return this.relationshipRepository.clean();
  }
}
