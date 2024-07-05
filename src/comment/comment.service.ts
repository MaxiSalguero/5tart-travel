import { Injectable } from '@nestjs/common';
import { commentRepository } from './comment.repository';


@Injectable()
export class CommentService {
    constructor(private commentRepository: commentRepository) { }

    getAllComment() {
        return this.commentRepository.getAllComments()
    }

    createComment(comm, id) {
        return this.commentRepository.createComment(comm, id)
    }
}
