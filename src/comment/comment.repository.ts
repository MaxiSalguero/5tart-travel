import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
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
          const tour = await this.tourRepository.findOne({
            where: { id: tourId },
            relations: ['comments'],
          });
      
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
      
          await this.updateTourRates(tourId);
      
          return 'Comentario enviado';
        } catch (error) {
          console.error('Error al crear el comentario:', error);
          throw new Error('Error al crear el comentario: ' + error.message);
        }
      }
      
      async updateTourRates(tourId: string) {
        
        const comments = await this.commentRepository.find({ where: { tour: { id: tourId } } });
      
        
        const avgRate = comments.reduce((sum, comment) => sum + comment.rate, 0) / comments.length;
        const roundedAvgRate = Math.round(avgRate);
      
        // Fetch the current tour data to include touristPoints
        const tour = await this.tourRepository.findOne({ where: { id: tourId } });
      
        if (!tour) {
          throw new Error('Tour no encontrado');
        }
      
        const tourData: { averageRate: number; touristPoints?: any } = {
          averageRate: roundedAvgRate,
          touristPoints: tour.touristPoints,
          // Otros campos...
        };
      
        // Serialize touristPoints if they exist
        if (tourData.touristPoints) {
          tourData.touristPoints = JSON.stringify(tourData.touristPoints);
        }
      
        // Actualizar el tour en la base de datos
        await this.tourRepository.update(tourId, tourData);
      }
      
      
}    