import { Injectable } from '@nestjs/common';

import {
  InMemoryDBEntity,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';

type WhereFilter<Key> = {
  [Prop in keyof Key]?: WhereFilter<Key[Prop]>;
};

export interface DeleteResult {
  affectedRows: number;
}

@Injectable()
export class Repository<Entity extends InMemoryDBEntity> {
  constructor(private readonly inMemoryDBService: InMemoryDBService<Entity>) {}

  async find(whereFilter: WhereFilter<Entity> = {}): Promise<Entity[]> {
    const collection = this.inMemoryDBService.getAll();

    const filterEntries = Object.entries(whereFilter);

    return collection.filter((item) => this.executeFilter(item, filterEntries));
  }

  async findOne(whereFilter: WhereFilter<Entity>): Promise<Entity> {
    const collection = this.inMemoryDBService.getAll();

    const filterEntries = Object.entries(whereFilter);

    return collection.find((item) => this.executeFilter(item, filterEntries));
  }

  async create(data: Partial<Entity>): Promise<Entity> {
    return this.inMemoryDBService.create(data);
  }

  async clean(): Promise<DeleteResult> {
    const collections = await this.find();

    const idsToRemove = collections.map((item) => item.id);

    this.inMemoryDBService.deleteMany(idsToRemove);

    return {
      affectedRows: collections.length,
    };
  }

  private executeFilter(item: Entity, filterEntries: [string, any][]): boolean {
    return filterEntries.every(([key, value]) => item[key] === value);
  }
}
