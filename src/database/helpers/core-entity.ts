import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  readonly id?: string;

  @CreateDateColumn({ update: false })
  readonly createdAt?: Date;

  @UpdateDateColumn({})
  readonly updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  readonly deletedAt?: Date | null;
}
