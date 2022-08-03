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
import { Person } from './entities/person.entity';
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
  create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personService.create(createPersonDto);
  }

  @Get(':cpf')
  @OkResponse({ type: PersonDto })
  @NotFoundResponse()
  findOne(@Param('cpf') cpf: string): Promise<Person> {
    return this.personService.findOne(cpf);
  }
}
