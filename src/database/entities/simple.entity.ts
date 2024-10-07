import { Column, Entity } from 'typeorm';
import { CoreEntity } from '@/database/helpers/core-entity';

@Entity()
export class Simple extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', default: 18 })
  age: number;
}
