import { Test, TestingModule } from '@nestjs/testing';
import { MockedPersonService } from '../person/mock/person.mock';
import { MockedRelationshipService } from '../relationship/mock/relationship.mock';
import { CleanService } from './clean.service';

describe('CleanService', () => {
  let service: CleanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleanService, MockedPersonService, MockedRelationshipService],
    }).compile();

    service = module.get<CleanService>(CleanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
