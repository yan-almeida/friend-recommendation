import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonService } from './person.service';

@Controller('people')
@ApiTags('People')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.personService.findOne(cpf);
  }
}
