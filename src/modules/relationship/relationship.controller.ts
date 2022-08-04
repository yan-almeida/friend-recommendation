import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BadRequestResponse,
  CreatedResponse,
  NotFoundResponse,
} from '../../infra/docs/decorators';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { RelationshipDto } from './dto/relationship.dto';
import { RelationshipService } from './relationship.service';

@Controller('relationships')
@ApiTags('Relationships')
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @BadRequestResponse()
  @NotFoundResponse()
  @CreatedResponse({
    description: 'Create a relationship.',
    type: RelationshipDto,
  })
  create(
    @Body() createRelationshipDto: CreateRelationshipDto,
  ): Promise<RelationshipDto> {
    return this.relationshipService.create(createRelationshipDto);
  }
}
