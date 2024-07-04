import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
    constructor(private commentRepository: CommentRepository){}

    getAllComment() {
        return this.commentRepository.getAllComment()
    }

    createComment(comm){
        return this.commentRepository.createComment(comm)
    }
}
