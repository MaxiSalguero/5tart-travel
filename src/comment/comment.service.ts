import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from 'src/entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  createComment(comment: Partial<CommentEntity>, tourId: string) {
    return this.commentRepository.createComment(comment, tourId);
  }
}
