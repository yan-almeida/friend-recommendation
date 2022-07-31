import { Module } from '@nestjs/common';
import { CleanService } from './clean.service';
import { CleanController } from './clean.controller';

@Module({
  controllers: [CleanController],
  providers: [CleanService]
})
export class CleanModule {}
