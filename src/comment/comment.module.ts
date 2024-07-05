import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { CommentRepository } from './comment.repository';
import { TourEntity } from 'src/entities/tour.entity';



@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, TourEntity])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  
})
export class CommentModule {}
