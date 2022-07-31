import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Person } from 'src/modules/person/entities/person.entity';

export interface Relationship extends InMemoryDBEntity {
  person: Person;
  follows: Person;
}
