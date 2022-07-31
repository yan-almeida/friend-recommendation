export class MutualFriendsDto {
  friendOfFriendToFollow: string;
  mutualFriends: number;

  static toDto(dto: MutualFriendsDto) {
    return dto;
  }
}
