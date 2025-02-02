import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { CoreEntity } from '../helpers/core-entity';
import { User } from './user.entity';

@Entity()
export class Trip extends CoreEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  destination?: string;

  @ManyToOne(() => User, (user) => user.trips, { nullable: false })
  @JoinColumn()
  traveler: User;

  @Column({ type: 'numeric', default: 0 })
  cost: number;
}
