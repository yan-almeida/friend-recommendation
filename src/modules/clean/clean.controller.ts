import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NoContentResponse } from '../../infra/docs/decorators';
import { CleanService } from './clean.service';

@Controller('clean')
@ApiTags('clean')
export class CleanController {
  constructor(private readonly cleanService: CleanService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @NoContentResponse({ description: 'Clean all data in app context.' })
  clean(): Promise<void> {
    return this.cleanService.clean();
  }
}
