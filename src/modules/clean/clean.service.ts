import { Injectable } from '@nestjs/common';
import { CreateCleanDto } from './dto/create-clean.dto';
import { UpdateCleanDto } from './dto/update-clean.dto';

@Injectable()
export class CleanService {
  create(createCleanDto: CreateCleanDto) {
    return 'This action adds a new clean';
  }

  findAll() {
    return `This action returns all clean`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clean`;
  }

  update(id: number, updateCleanDto: UpdateCleanDto) {
    return `This action updates a #${id} clean`;
  }

  remove(id: number) {
    return `This action removes a #${id} clean`;
  }
}
