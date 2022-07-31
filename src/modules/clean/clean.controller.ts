import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CleanService } from './clean.service';

@Controller('clean')
@ApiTags('clean')
export class CleanController {
  constructor(private readonly cleanService: CleanService) {}

  @Post()
  create() {
    return this.cleanService.clean();
  }
}
