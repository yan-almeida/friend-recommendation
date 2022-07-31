import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface Person extends InMemoryDBEntity {
  cpf: string;
  name: string;
}
