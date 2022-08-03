import { Module } from '@nestjs/common';
import { PersonModule } from '../person/person.module';
import { RelationshipModule } from '../relationship/relationship.module';
import { CleanController } from './clean.controller';
import { CleanService } from './clean.service';

@Module({
  imports: [PersonModule, RelationshipModule],
  controllers: [CleanController],
  providers: [CleanService],
})
export class CleanModule {}
