import { PartialType } from '@nestjs/swagger';
import { CreateCleanDto } from './create-clean.dto';

export class UpdateCleanDto extends PartialType(CreateCleanDto) {}
