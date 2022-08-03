import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BadRequestResponse,
  NotFoundResponse,
  OkResponse,
} from '../../infra/docs/decorators';
import { MutualFriendsDto } from './dto/mutual-friends.dto';
import { RecommendationParamDto } from './dto/recommendation-param.dto';
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
    @Param()
    { cpf }: RecommendationParamDto,
  ): Promise<MutualFriendsDto[]> {
    return this.recommendationService.recommendations(cpf);
  }
}
