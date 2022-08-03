import { Repository } from '@app/in-memory-repository';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Test, TestingModule } from '@nestjs/testing';
import { Person } from './entities/person.entity';
import { createPersonDto, personMock } from './mock/person.mock';
import { PersonService } from './person.service';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  clean: jest.fn(),
};

describe('PersonService', () => {
  let personService: PersonService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDBModule.forFeature('Person')],
      providers: [
        PersonService,
        {
          provide: Repository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    personService = module.get<PersonService>(PersonService);
  });

  beforeEach(() => {
    mockRepository.clean.mockReset();
    mockRepository.create.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
  });

  it('should be defined', () => {
    expect(personService).toBeDefined();
  });

  describe('create', () => {
    it('should create a person', async () => {
      mockRepository.create.mockReturnValue(personMock);

      const createdPerson = await personService.create(createPersonDto);

      expect(createdPerson).toMatchObject(personMock);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throws a conflict exception when a person already exists', async () => {
      mockRepository.findOne.mockReturnValue(personMock);

      await expect(personService.create(createPersonDto)).rejects.toThrowError(
        'Person already exists!',
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should found a person by cpf', async () => {
      mockRepository.findOne.mockReturnValue(personMock);

      const foundPerson = await personService.findOne(personMock.cpf);

      expect(foundPerson).toMatchObject(personMock);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throws a not found exception when a person doesnt exists', async () => {
      mockRepository.findOne.mockReturnValue(null);

      await expect(personService.findOne(personMock.cpf)).rejects.toThrowError(
        `Person not found with cpf ${personMock.cpf}`,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('clean', () => {
    it('should clean all data of person', async () => {
      const peopleToCreate: Person[] = [personMock, personMock, personMock];
      peopleToCreate.forEach((person) => personService.create(person));

      mockRepository.create.mockReturnValue(personMock);
      mockRepository.clean.mockReturnValue({
        affectedRows: peopleToCreate.length,
      });

      const clean = await personService.clean();

      expect(clean).toMatchObject({ affectedRows: peopleToCreate.length });
    });
  });
});
