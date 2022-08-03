import { Repository } from '@app/in-memory-repository';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Test, TestingModule } from '@nestjs/testing';
import { MockedPersonService, personMock } from '../person/mock/person.mock';
import { Relationship } from '../relationship/entities/relationship.entity';
import {
  findRelationshipsByCpf,
  MockedRelationshipService,
  mockRelationshipService,
} from '../relationship/mock/relationship.mock';
import { MutualFriendsDto } from './dto/mutual-friends.dto';
import { RecommendationService } from './recommendation.service';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  clean: jest.fn(),
};

describe('RecommendationService', () => {
  let recommendationService: RecommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDBModule.forFeature('Relationship')],
      providers: [
        RecommendationService,
        {
          provide: Repository,
          useValue: mockRepository,
        },
        MockedPersonService,
        MockedRelationshipService,
      ],
    }).compile();

    recommendationService = module.get<RecommendationService>(
      RecommendationService,
    );
  });

  it('should be defined', () => {
    expect(recommendationService).toBeDefined();
  });

  describe('recommendations', () => {
    it('should find recommendations by cpf', async () => {
      const relationships: Relationship[] = [
        {
          person: {
            cpf: '01234567890',
            name: 'string',
            id: '16ce1313-8237-4e22-bf1c-9aabd2985d2d',
          },
          follows: {
            cpf: '01234567891',
            name: 'string',
            id: '7e0984be-cc42-47b9-939d-2a8f1e4ab6cc',
          },
          id: '453ddbf3-2cf4-4967-a19b-0ff729204ed9',
        },
        {
          person: {
            cpf: '01234567890',
            name: 'string',
            id: '16ce1313-8237-4e22-bf1c-9aabd2985d2d',
          },
          follows: {
            cpf: '01234567892',
            name: 'string',
            id: 'beddf6c5-41bc-4393-b1dc-0839bc587f90',
          },
          id: '267d62ff-445d-4b52-aef7-178dc242c958',
        },
        {
          person: {
            cpf: '01234567891',
            name: 'string',
            id: '16ce1313-8237-4e22-bf1c-9aabd2985d2d',
          },
          follows: {
            cpf: '01234567893',
            name: 'string',
            id: 'beddf6c5-41bc-4393-b1dc-0839bc587f90',
          },
          id: '267d62ff-445d-4b52-aef7-178dc242c958',
        },
        {
          person: {
            cpf: '01234567892',
            name: 'string',
            id: '16ce1313-8237-4e22-bf1c-9aabd2985d2d',
          },
          follows: {
            cpf: '01234567893',
            name: 'string',
            id: 'beddf6c5-41bc-4393-b1dc-0839bc587f90',
          },
          id: '267d62ff-445d-4b52-aef7-178dc242c958',
        },
        {
          person: {
            cpf: '01234567892',
            name: 'string',
            id: '16ce1313-8237-4e22-bf1c-9aabd2985d2d',
          },
          follows: {
            cpf: '01234567894',
            name: 'string',
            id: 'beddf6c5-41bc-4393-b1dc-0839bc587f90',
          },
          id: '267d62ff-445d-4b52-aef7-178dc242c958',
        },
      ];

      const mutualFriends: MutualFriendsDto[] = [
        {
          mutualFriends: 2,
          friendOfFriendToFollow: '01234567893',
        },
        {
          mutualFriends: 1,
          friendOfFriendToFollow: '01234567894',
        },
      ];

      mockRelationshipService.findAllFriendsByCpf
        .mockReturnValueOnce(
          findRelationshipsByCpf('01234567890', relationships),
        )
        .mockReturnValueOnce(
          findRelationshipsByCpf('01234567891', relationships),
        )
        .mockReturnValueOnce(
          findRelationshipsByCpf('01234567892', relationships),
        );

      const recommendations = await recommendationService.recommendations(
        personMock.cpf,
      );

      expect(recommendations).toEqual(expect.arrayContaining(mutualFriends));
      expect(mockRelationshipService.findAllFriendsByCpf).toBeCalledTimes(3);
    });
  });
});
