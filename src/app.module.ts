import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { default as AppConfig } from './infra/configs/app.config';
import { PersonModule } from './modules/person/person.module';
import { RelationshipModule } from './modules/relationship/relationship.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { CleanModule } from './modules/clean/clean.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    PersonModule,
    RelationshipModule,
    RecommendationModule,
    CleanModule,
  ],
})
export class AppModule {}
