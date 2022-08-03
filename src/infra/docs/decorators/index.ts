import { ApiProperty } from '@nestjs/swagger';

export * from './bad-request-response.decorator';
export * from './conflict-response.decorator';
export * from './created-response.decorator';
export * from './no-content-response.decorator';
export * from './not-found-response.decorator';
export * from './ok-response.decorator';

export class DefaultMessageDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}
