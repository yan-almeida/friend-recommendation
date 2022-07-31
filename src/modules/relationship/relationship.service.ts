import { Repository } from '@app/in-memory-repository';
import { Injectable } from '@nestjs/common';
import { PersonService } from 'src/modules/person/person.service';
import { Relationship } from 'src/modules/relationship/entities/relationship.entity';
import { Person } from '../person/entities/person.entity';
import { CreateRelationshipDto } from './dto/create-relationship.dto';

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
}
