import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BadRequestResponse,
  ConflictResponse,
  NotFoundResponse,
  OkResponse,
} from '../../infra/docs/decorators';
import { CreatedResponse } from '../../infra/docs/decorators/created-response.decorator';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonDto } from './dto/person.dto';
import { PersonService } from './person.service';

@Controller('people')
@ApiTags('People')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CreatedResponse({ type: PersonDto })
  @BadRequestResponse()
  @NotFoundResponse()
  @ConflictResponse()
  create(@Body() createPersonDto: CreatePersonDto): Promise<PersonDto> {
    return this.personService.create(createPersonDto);
  }

  @Get(':cpf')
  @OkResponse({ type: PersonDto })
  @NotFoundResponse()
  findOne(@Param('cpf') cpf: string): Promise<PersonDto> {
    return this.personService.findOne(cpf);
  }
}
