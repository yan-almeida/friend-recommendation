import { Injectable } from '@nestjs/common';
import { groupBy } from 'ramda';
import { Person } from '../person/entities/person.entity';
import { RelationshipService } from '../relationship/relationship.service';
import { MutualFriendsDto } from './dto/mutual-friends.dto';

@Injectable()
export class RecommendationService {
  constructor(private readonly relationshipService: RelationshipService) {}

  async recommendations(cpf: string): Promise<MutualFriendsDto[]> {
    const foundFriendsOfFriends: Person[] = [];

    const friendsOfFriends = this.friendOfFriends(cpf);

    for await (const friendOfFriend of friendsOfFriends) {
      if (cpf !== friendOfFriend.cpf) {
        foundFriendsOfFriends.push(friendOfFriend);
      }
    }
    const groupedFriendsOfFriends = groupBy(
      (person) => person.cpf,
      foundFriendsOfFriends,
    );

    return this.orderByMutual(groupedFriendsOfFriends);
  }

  async orderByMutual(
    groupedFriendsOfFriends: Record<string, Person[]>,
  ): Promise<MutualFriendsDto[]> {
    const entriesFriendsOfFriends = Object.entries(groupedFriendsOfFriends);

    const entriesToDto = entriesFriendsOfFriends.map(
      ([cpf, { length: mutualFriends }]) =>
        MutualFriendsDto.toDto({
          mutualFriends,
          friendOfFriendToFollow: cpf,
        }),
    );

    return entriesToDto.sort();
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
