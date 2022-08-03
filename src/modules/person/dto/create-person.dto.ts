import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ example: '01234567890' })
  @Length(11, 11)
  cpf: string;

  @ApiProperty({ example: 'Robert' })
  @IsString()
  name: string;
}
