import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum HousingType {
  OWNED = 'owned',
  RENTED = 'rented',
  OTHER = 'other',
}

@Entity()
export class Household {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.households, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'float' })
  income: number;

  @Column({ type: 'enum', enum: HousingType })
  housing: HousingType;

  @Column({ default: false })
  disability: boolean;

  @Column({ type: 'int' })
  childrenCount: number;

  @Column({ type: 'int' })
  adultsCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}