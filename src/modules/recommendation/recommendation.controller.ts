import { Controller, Get, Param } from '@nestjs/common';
import { MutualFriendsDto } from './dto/mutual-friends.dto';
import { RecommendationService } from './recommendation.service';

@Controller('recommendations')
@Controller('Recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':cpf')
  recommendations(@Param('cpf') cpf: string): Promise<MutualFriendsDto[]> {
    return this.recommendationService.recommendations(cpf);
  }
}
