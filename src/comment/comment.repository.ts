import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/DTOS/CreateComment.dto';
import { CommentEntity } from 'src/entities/comment.entity';
import { TourEntity } from 'src/entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentRepository {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(TourEntity)
        private readonly tourRepository: Repository<TourEntity>,
        
    ) { }

    async getAllComment(): Promise<CommentEntity[]> {
        return await this.commentRepository.find();
    }

    async createComment(comment: CreateCommentDto, tourId: string): Promise<string> {
        try {
          
            const tour = await this.tourRepository.findOne({ where: { id: tourId } });
    
           
            const newComment = this.commentRepository.create({
                ...comment,
                tour: tour, 
            });
    
            
            const comentario=await this.commentRepository.save(newComment);
           
    
            
            return 'Comentario enviado';
        } catch (error) {
            
            throw new Error('Error al crear el comentario: ' + error.message);
        }
    }
    
}
