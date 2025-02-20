import { Controller, Post, Body, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Request } from 'express';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Req() req: Request, @Body() createLikeDto: CreateLikeDto) {
    if (req.session.userId) {
      return this.likesService.likeTweetOrUnlike(
        req.session.userId,
        createLikeDto,
      );
    }
  }

  // @Get()
  // findAll() {
  //   return this.likesService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.likesService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
  //   return this.likesService.update(+id, updateLikeDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.likesService.remove(+id);
  // }
}
