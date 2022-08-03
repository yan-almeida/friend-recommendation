import { ApiProperty } from '@nestjs/swagger';

export class CreateRelationshipDto {
  @ApiProperty({ example: '01234567890' })
  personCpf: string;

  @ApiProperty({ example: '01234567891' })
  followsCpf: string;
}
