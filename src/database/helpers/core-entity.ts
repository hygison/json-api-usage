import { randomUUID } from 'crypto';
import { BaseEntity, BeforeInsert, CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class CoreEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id?: string;

  @CreateDateColumn({ update: false })
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  readonly deletedAt?: Date | null;

  @BeforeInsert()
  private assignUuid() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
