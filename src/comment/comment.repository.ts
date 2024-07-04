import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/DTOS/CreateComment.dto';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentRepository {
    constructor(@InjectRepository(CommentEntity)
                private readonly commentRepository: Repository<CommentEntity> ){}

    async getAllComment() {
        const comment: CommentEntity[] = await this.commentRepository.find()

        if (comment.length == 0) {
            return `No hay comentarios`
        }

        return comment
    }

    async createComment(comment: CreateCommentDto) {
        const newComment = await this.commentRepository.create(comment);
        await this.commentRepository.save(newComment)

        return `Enviado`
    }
}
