import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  studios: string; // pode ter mais de 1 separado por vírgula

  @Column({ type: 'varchar' })
  producers: string; // pode ter mais de 1 separado por vírgula

  @Column({ type: 'boolean', default: false })
  winner: boolean;
};
