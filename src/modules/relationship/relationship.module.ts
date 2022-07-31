import { Repository } from '@app/in-memory-repository';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { PersonModule } from '../person/person.module';
import { RelationshipController } from './relationship.controller';
import { RelationshipService } from './relationship.service';

@Module({
  imports: [PersonModule, InMemoryDBModule.forFeature('Relationship')],
  controllers: [RelationshipController],
  providers: [RelationshipService, Repository],
  exports: [RelationshipService],
})
export class RelationshipModule {}
