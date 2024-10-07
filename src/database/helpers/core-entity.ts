import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  readonly id?: string;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  readonly deletedAt?: Date | null;
}
