import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { PrismaService } from '@/src/core/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prismaService: PrismaService) {}

  async likeTweetOrUnlike(userId: string, { tweetId }: CreateLikeDto) {
    const existingLike = await this.prismaService.like.findFirst({
      where: { userId, tweetId },
    });

    if (existingLike) {
      return this.prismaService.like.delete({
        where: { userId_tweetId: { userId, tweetId } },
      });
    }

    return this.prismaService.like.create({
      data: {
        userId,
        tweetId,
      },
    });
  }
}
