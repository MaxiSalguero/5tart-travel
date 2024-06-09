import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class PromotionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  description: string;
}
