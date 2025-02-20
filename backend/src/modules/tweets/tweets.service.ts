import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from '@/prisma/generated';

@Injectable()
export class TweetsService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async addTweet(req: Request, createTweetDto: CreateTweetDto) {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    const tweet = this.prismaService.tweet.create({
      data: {
        userId: req.session.userId,
        content: createTweetDto.content,
        parentId: createTweetDto.parentId || null,
      },
    });
    return tweet;
  }

  public async getAllTweetsByUser(req: Request): Promise<Tweet[]> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    return this.prismaService.tweet.findMany({
      where: { userId: req.session.userId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        Like: {
          where: {
            userId: req.session.userId, // Only check if the logged-in user has liked it
          },
          select: {
            id: true, // You can also just count if needed
          },
        },
        _count: {
          select: {
            replies: true,
            Like: true, // Count total likes for this tweet
          },
        },
      },
    });
  }

  public async getAllTweets(req: Request): Promise<Tweet[]> {
    if (!req.session.userId) {
      return this.prismaService.tweet.findMany({
        where: {
          parentId: null,
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
          replies: {
            include: {
              user: { select: { username: true } },
              _count: {
                select: { Like: true },
              },
            },
          },
          _count: {
            select: {
              replies: true,
              Like: true,
            },
          },
        },
      });
    }

    return this.prismaService.tweet
      .findMany({
        where: {
          parentId: null,
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          Like: {
            where: {
              userId: req.session.userId, // Check if this specific user liked the tweet
            },
            select: {
              id: true, // Only select the ID if the like exists
            },
          },
          _count: {
            select: {
              replies: true,
              Like: true, // Count total likes
            },
          },
        },
      })
      .then((tweets) =>
        tweets.map((tweet) => ({
          ...tweet,
          isLiked: tweet.Like.length > 0, // Add isLiked property
        })),
      );
  }
  public async getById(req: Request, id: string): Promise<Tweet> {
    return this.prismaService.tweet.findFirstOrThrow({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        replies: {
          include: {
            user: { select: { username: true } },
            _count: {
              select: { Like: true },
            },
          },
        },
        _count: {
          select: {
            replies: true,
            Like: true,
          },
        },
      },
    });
  }

  async update(req: Request, updateTweetDto: UpdateTweetDto) {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    const { id, ...updateData } = updateTweetDto;
    return this.prismaService.tweet.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(req: Request, id: string): Promise<boolean> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    await this.prismaService.tweet.delete({
      where: { id: id, userId: req.session.userId },
    });
    return true;
  }
}
