import { Injectable } from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { RelationshipService } from '../relationship/relationship.service';

@Injectable()
export class CleanService {
  constructor(
    private readonly personService: PersonService,
    private readonly relationshipService: RelationshipService,
  ) {}

  async clean(): Promise<void> {
    await this.personService.clean();
    await this.relationshipService.clean();
  }
}
