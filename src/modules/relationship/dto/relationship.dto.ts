import { ApiProperty } from '@nestjs/swagger';
import { PersonDto } from '../../person/dto/person.dto';
import { Relationship } from '../entities/relationship.entity';

export class RelationshipDto implements Relationship {
  @ApiProperty({ type: PersonDto })
  person: PersonDto;

  @ApiProperty({ type: PersonDto })
  follows: PersonDto;

  @ApiProperty()
  id: string;
}
