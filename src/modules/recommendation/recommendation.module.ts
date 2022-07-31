import { Module } from '@nestjs/common';
import { RelationshipModule } from '../relationship/relationship.module';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [RelationshipModule],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
