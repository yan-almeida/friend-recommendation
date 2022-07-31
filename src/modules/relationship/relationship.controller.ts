import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { RelationshipService } from './relationship.service';

@Controller('relationships')
@ApiTags('Relationships')
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post()
  create(@Body() createRelationshipDto: CreateRelationshipDto) {
    return this.relationshipService.create(createRelationshipDto);
  }
}
