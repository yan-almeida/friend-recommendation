import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class RecommendationParamDto {
  @Length(11, 11)
  @ApiProperty({ example: '01234567890 - only 11 characters' })
  cpf: string;
}
