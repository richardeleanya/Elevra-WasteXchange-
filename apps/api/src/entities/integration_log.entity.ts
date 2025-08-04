import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class IntegrationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  provider: string;

  @Column()
  status: string;

  @Column({ type: 'jsonb' })
  payload: any;

  @CreateDateColumn()
  receivedAt: Date;
}