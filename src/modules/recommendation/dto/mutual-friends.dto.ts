import { ApiProperty } from '@nestjs/swagger';

export class MutualFriendsDto {
  @ApiProperty()
  friendOfFriendToFollow: string;

  @ApiProperty()
  mutualFriends: number;

  static toDto(dto: MutualFriendsDto) {
    return dto;
  }
}
