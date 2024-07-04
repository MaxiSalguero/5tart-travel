import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/DTOS/CreateComment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService){}


    @Get()
    getAllComment(){
        return this.commentService.getAllComment()
    }

    @Post()
    createComment(@Body() comm: CreateCommentDto){
        return this.commentService.createComment(comm)
    }

}
