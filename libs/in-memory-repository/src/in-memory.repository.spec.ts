import {
  InMemoryDBEntity,
  InMemoryDBModule,
} from '@nestjs-addons/in-memory-db';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from './in-memory.repository';

interface CustomEntity extends InMemoryDBEntity {
  name: string;
}

const inputFeatureName = 'customEntity';

describe(Repository.name, () => {
  let repository: Repository<CustomEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDBModule.forFeature(inputFeatureName)],
      providers: [Repository],
    }).compile();

    repository = module.get<Repository<CustomEntity>>(Repository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('find', () => {
    it('should find all entities', async () => {
      const patternName = 'custom-name';
      await repository.create({ name: `${patternName}-001` });
      await repository.create({ name: `${patternName}-002` });

      const result = await repository.find();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.stringContaining(`${patternName}`),
          }),
        ]),
      );
      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should find an entity by name', async () => {
      await repository.create({ name: 'custom-name' });

      const createResult = await repository.findOne({ name: 'custom-name' });

      expect(createResult).toMatchObject({ name: 'custom-name' });
    });
  });

  describe('create', () => {
    it('should create an entity', async () => {
      const createResult = await repository.create({ name: 'custom-name' });

      expect(createResult).toMatchObject({ name: 'custom-name' });
    });
  });

  describe('clean', () => {
    it('should clean all data of custom entity', async () => {
      const customEntityToCreate = [
        { name: 'custom-name' },
        { name: 'custom-name' },
        { name: 'custom-name' },
      ];
      customEntityToCreate.forEach((entity) => repository.create(entity));

      const clean = await repository.clean();
      const find = await repository.find();

      expect(clean).toMatchObject({
        affectedRows: customEntityToCreate.length,
      });
      expect(find).toEqual([]);
    });
  });
});
