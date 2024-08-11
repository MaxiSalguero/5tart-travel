import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/DTOS/CreateComment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':id')
  async createComment(
    @Body() comment: CreateCommentDto,
    @Param('id', ParseUUIDPipe) tourId: string,
  ) {
    await this.commentService.createComment(comment, tourId);

    return 'Comentario creado y promedio de calificaciones actualizado (si corresponde).';
  }
}
