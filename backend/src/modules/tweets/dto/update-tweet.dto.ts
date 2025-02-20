import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateTweetDto } from './create-tweet.dto';

export class UpdateTweetDto extends PartialType(CreateTweetDto) {
  @ApiProperty()
  @IsString()
  id: string;
}
