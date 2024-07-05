import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/DTOS/CreateComment.dto';
import { TourService } from 'src/tour/tour.service';
import { get } from 'http';



@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService,
       
    ) { }


    @Get()
    getAllComment() {
        return this.commentService.getAllComment()
    }
   

    @Post(':tourId')
    async createComment(@Body() commentDto: CreateCommentDto, @Param('tourId') tourId: string) {
      await this.commentService.createComment(commentDto, tourId);
      
      return 'Comentario creado y promedio de calificaciones actualizado (si corresponde).';
    }
    

}
