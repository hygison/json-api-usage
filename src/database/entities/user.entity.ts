import { MaxLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '@/database/helpers/core-entity';

@Entity()
export class User extends CoreEntity {
  constructor(obj = {}) {
    super();
    Object.assign(this, obj);
  }

  @MaxLength(150)
  @Column({ type: 'varchar', length: 150, nullable: true })
  name?: string | null;

  @MaxLength(255)
  @Column({ type: 'varchar', length: 255, nullable: true })
  bio?: string | null;
}
