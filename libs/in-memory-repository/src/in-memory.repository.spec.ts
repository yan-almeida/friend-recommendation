import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from './in-memory.repository';

describe('InMemoryRepositoryService', () => {
  let service: Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Repository],
    }).compile();

    service = module.get<Repository>(Repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
