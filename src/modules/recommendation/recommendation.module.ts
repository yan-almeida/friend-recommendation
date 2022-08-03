import { Module } from '@nestjs/common';
import { PersonModule } from '../person/person.module';
import { RelationshipModule } from '../relationship/relationship.module';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [RelationshipModule, PersonModule],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
