import { Injectable } from '@nestjs/common';

import {
  InMemoryDBEntity,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
declare type WhereFilter<Key> = {
  [Prop in keyof Key]?: WhereFilter<Key[Prop]>;
};
export declare class Repository<Entity extends InMemoryDBEntity> {
  private readonly inMemoryDBService;

  private createFilter;
}
export {};

@Injectable()
export class Repository<Entity extends InMemoryDBEntity> {
  constructor(inMemoryDBService: InMemoryDBService<Entity>);
  find(whereFilter?: WhereFilter<Entity>): Promise<Entity[]>;
  findOne(whereFilter: WhereFilter<Entity>): Promise<Entity>;
  create(data: Partial<Entity>): Promise<Entity>;
}
