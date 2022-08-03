import { Injectable } from '@nestjs/common';
import { groupBy } from 'ramda';
import { Person } from '../person/entities/person.entity';
import { PersonService } from '../person/person.service';
import { RelationshipService } from '../relationship/relationship.service';
import { MutualFriendsDto } from './dto/mutual-friends.dto';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly relationshipService: RelationshipService,
    private readonly personService: PersonService,
  ) {}

  async recommendations(cpf: string): Promise<MutualFriendsDto[]> {
    await this.personService.findOne(cpf);

    const friendsOfFriends = this.friendOfFriends(cpf);

    const foundFriendsOfFriends: Person[] = [];

    for await (const friendOfFriend of friendsOfFriends) {
      if (cpf !== friendOfFriend.cpf) {
        foundFriendsOfFriends.push(friendOfFriend);
      }
    }

    const groupedFriendsOfFriends = groupBy(
      (person) => person.cpf,
      Array.from(foundFriendsOfFriends.values()),
    );

    return this.orderByMutual(groupedFriendsOfFriends);
  }

  private async orderByMutual(
    groupedFriendsOfFriends: Record<string, Person[]>,
  ): Promise<MutualFriendsDto[]> {
    const entriesFriendsOfFriends = Object.entries(groupedFriendsOfFriends);

    return entriesFriendsOfFriends
      .map(([cpf, { length: mutualFriends }]) =>
        MutualFriendsDto.toDto({
          mutualFriends,
          friendOfFriendToFollow: cpf,
        }),
      )
      .sort(({ mutualFriends }) => mutualFriends);
  }

  private async *friendOfFriends(
    cpf: string,
  ): AsyncGenerator<Person, void, unknown> {
    const friends = await this.relationshipService.findAllFriendsByCpf(cpf);

    for (const friend of friends) {
      const friendsOfFriends =
        await this.relationshipService.findAllFriendsByCpf(friend.cpf);

      for (const friendOfFriend of friendsOfFriends) {
        yield friendOfFriend;
      }
    }
  }
}
