import { Person } from 'src/modules/person/entities/person.entity';

export class FilterPersonDto implements Omit<Partial<Person>, 'id'> {
  cpf?: string;

  name?: string;
}
