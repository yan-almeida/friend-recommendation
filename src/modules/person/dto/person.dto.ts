import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cpf: string;
}
