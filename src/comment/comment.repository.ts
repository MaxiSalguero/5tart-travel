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
            const tour = await this.tourRepository.findOne({ where: { id: tourId }, relations: ['comments'] });
    
            if (!tour) {
                throw new Error('Tour no encontrado');
            }
    
            if (typeof comment.rate !== 'number' || isNaN(comment.rate)) {
                throw new Error('La propiedad rate del comentario no es válida');
            }
    
            const newComment = this.commentRepository.create({
                ...comment,
                tour: tour,
            });
    
            await this.commentRepository.save(newComment);
    
            await this.updateTourRates(tour);
    
            return 'Comentario enviado';
        } catch (error) {
            console.error('Error al crear el comentario:', error);
            throw new Error('Error al crear el comentario: ' + error.message);
        }
    }
    private async updateTourRates(tour: TourEntity): Promise<void> {
        try {
            const comments = await this.commentRepository.find({ where: { tour: tour } });
    
            if (!comments || comments.length === 0) {
                
                tour.rates = 0;
            } else {
                const totalRates = comments.reduce((acc, curr) => acc + curr.rate, 0);
                const averageRate = totalRates / comments.length;
                const roundedRate = Math.round(averageRate);
    
                tour.rates = roundedRate;
            }
    
            await this.tourRepository.update(tour.id, { rates: tour.rates });
        } catch (error) {
            console.error('Error al actualizar el promedio de rates del tour:', error);
            throw new Error('Error al actualizar el promedio de rates del tour: ' + error.message);
        }
    
    
    }
}
