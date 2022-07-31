import { Repository } from '@app/in-memory-repository';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [InMemoryDBModule.forFeature('Person')],
  controllers: [PersonController],
  providers: [PersonService, Repository],
  exports: [PersonService],
})
export class PersonModule {}
