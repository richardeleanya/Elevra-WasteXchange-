import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceId: string;

  @Column({ default: 'stripe' })
  provider: string;

  @Column({ default: 'created' })
  status: string;

  @Column()
  externalId: string;

  @Column({ nullable: true })
  clientSecret: string;

  @CreateDateColumn()
  createdAt: Date;
}