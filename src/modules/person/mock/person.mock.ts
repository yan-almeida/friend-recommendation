import { CreatePersonDto } from '../dto/create-person.dto';
import { Person } from '../entities/person.entity';
import { PersonService } from '../person.service';

export const createPersonDto: CreatePersonDto = {
  cpf: '01234567890',
  name: 'name',
};

export const personMock: Person = {
  ...createPersonDto,
  id: 'id',
};

export const mockPersonService = {
  create: jest.fn(),
  findOne: jest.fn(),
  clean: jest.fn(),
};

export const MockedPersonService = {
  provide: PersonService,
  useValue: mockPersonService,
};
