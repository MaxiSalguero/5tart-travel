import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async createComment(
    comment: Partial<CommentEntity>,
    tourId: string,
  ): Promise<string> {
    try {
      const tour = await this.tourRepository.findOne({
        where: { id: tourId },
        relations: { comments: true },
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

  async updateTourRates(tourId: string): Promise<string> {
    try {
      const comments = await this.commentRepository.find({
        where: { tour: { id: tourId } },
      });

      const avgRate =
        comments.reduce((sum, comment) => sum + comment.rate, 0) /
        comments.length;
      const roundedAvgRate = Math.round(avgRate);

      const tour = await this.tourRepository.findOne({ where: { id: tourId } });

      if (!tour) {
        throw new Error('Tour no encontrado');
      }

      tour.averageRate = roundedAvgRate;

      await this.tourRepository.save(tour);

      return 'Calificaciones del tour actualizadas correctamente';
    } catch (error) {
      console.error('Error al actualizar las calificaciones del tour:', error);
      throw new Error(
        'Error al actualizar las calificaciones del tour: ' + error.message,
      );
    }
  }
}
