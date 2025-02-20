import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { Request } from 'express';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from '@/prisma/generated';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Public } from '@/src/shared/decorators/public.decorator';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  async addTweet(@Req() req: Request, @Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.addTweet(req, createTweetDto);
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request): Promise<Tweet[]> {
    return this.tweetsService.getAllTweets(req);
  }

  @Get('/user')
  async getAllTweetsByUser(@Req() req: Request): Promise<Tweet[]> {
    return this.tweetsService.getAllTweetsByUser(req);
  }

  @Get(':id')
  async getById(@Req() req: Request, @Param('id') id: string) {
    return this.tweetsService.getById(req, id);
  }

  @Patch()
  async update(@Req() req: Request, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetsService.update(req, updateTweetDto);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    return this.tweetsService.remove(req, id);
  }
}
