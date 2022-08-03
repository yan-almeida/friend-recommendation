import { Repository } from '@app/in-memory-repository';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  MockedPersonService,
  mockPersonService,
  personMock,
} from '../person/mock/person.mock';
import { Relationship } from './entities/relationship.entity';
import {
  createRelationshipDto,
  relationshipMock,
} from './mock/relationship.mock';
import { RelationshipService } from './relationship.service';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  clean: jest.fn(),
};

describe('RelationshipService', () => {
  let relationshipService: RelationshipService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDBModule.forFeature('Relationship')],
      providers: [
        RelationshipService,
        MockedPersonService,
        {
          provide: Repository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    relationshipService = module.get<RelationshipService>(RelationshipService);
  });

  beforeEach(() => {
    mockRepository.clean.mockReset();
    mockRepository.create.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockPersonService.findOne.mockReset();
    mockPersonService.create.mockReset();
  });

  it('should be defined', () => {
    expect(relationshipService).toBeDefined();
  });

  describe('create', () => {
    it('should create a relationship', async () => {
      mockPersonService.findOne.mockResolvedValue(personMock);
      mockRepository.create.mockResolvedValue(relationshipMock);

      const createdRelationship = await relationshipService.create(
        createRelationshipDto,
      );

      expect(createdRelationship).toMatchObject(relationshipMock);
      expect(mockPersonService.findOne).toHaveBeenCalledTimes(2);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throws an error a not found exception when do not find person or person to relationship', async () => {
      mockPersonService.findOne.mockRejectedValue(
        new NotFoundException('Person not found.'),
      );

      await expect(
        relationshipService.create(createRelationshipDto),
      ).rejects.toThrowError('Person not found.');
      expect(mockPersonService.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAllFriendsByCpf', () => {
    it('should found all relationships of person by cpf', async () => {
      const relationships: Relationship[] = [
        relationshipMock,
        relationshipMock,
        relationshipMock,
      ];

      mockRepository.find.mockReturnValue(relationships);

      const friends = await relationshipService.findAllFriendsByCpf(
        personMock.cpf,
      );

      expect(friends).toEqual(
        expect.arrayContaining([expect.objectContaining(personMock)]),
      );
      expect(friends).toHaveLength(relationships.length);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('clean', () => {
    it('should clean all data of relationship', async () => {
      const relationshipsToCreate: Relationship[] = [
        relationshipMock,
        relationshipMock,
        relationshipMock,
      ];
      relationshipsToCreate.forEach((relationship) =>
        relationshipService.create({
          personCpf: relationship.person.cpf,
          followsCpf: relationship.follows.cpf,
        }),
      );

      mockRepository.create.mockReturnValue(relationshipMock);
      mockRepository.clean.mockReturnValue({
        affectedRows: relationshipsToCreate.length,
      });

      const clean = await relationshipService.clean();

      expect(clean).toMatchObject({
        affectedRows: relationshipsToCreate.length,
      });
    });
  });
});
