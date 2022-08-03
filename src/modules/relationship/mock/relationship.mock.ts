import { personMock } from '../../person/mock/person.mock';
import { CreateRelationshipDto } from '../dto/create-relationship.dto';
import { Relationship } from '../entities/relationship.entity';
import { RelationshipService } from '../relationship.service';

export const createRelationshipDto: CreateRelationshipDto = {
  followsCpf: '01234567890',
  personCpf: '01234567891',
};

export const relationshipMock: Relationship = {
  follows: personMock,
  person: personMock,
  id: 'id',
};

export const mockRelationshipService = {
  create: jest.fn(),
  findAllFriendsByCpf: jest.fn(),
  clean: jest.fn(),
};

export const MockedRelationshipService = {
  provide: RelationshipService,
  useValue: mockRelationshipService,
};

export const findRelationshipsByCpf = (
  cpf: string,
  relationships: Relationship[],
) => {
  return relationships
    .filter((relationship) => relationship.person.cpf === cpf)
    .map((relationship) => relationship.follows);
};
