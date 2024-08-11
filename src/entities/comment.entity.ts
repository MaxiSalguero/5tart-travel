import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TourEntity } from './tour.entity';

@Entity({
  name: 'comment',
})
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  good?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  bad?: string;

  @Column({
    nullable: true,
  })
  rate?: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @ManyToOne(() => TourEntity, (tour) => tour.comments)
  @JoinColumn({ name: 'tourId' })
  tour: TourEntity;
}
