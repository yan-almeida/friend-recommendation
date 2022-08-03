import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { length } from 'class-validator';
import {
  BadRequestResponse,
  NotFoundResponse,
  OkResponse,
} from '../../infra/docs/decorators';
import { MutualFriendsDto } from './dto/mutual-friends.dto';
import { RecommendationService } from './recommendation.service';

@Controller('recommendations')
@ApiTags('Recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':cpf')
  @OkResponse({
    type: [MutualFriendsDto],
  })
  @NotFoundResponse()
  @BadRequestResponse()
  recommendations(
    @Param('cpf', {
      transform(value) {
        length(value, 11, 11);
      },
    })
    cpf: string,
  ): Promise<MutualFriendsDto[]> {
    return this.recommendationService.recommendations(cpf);
  }
}
