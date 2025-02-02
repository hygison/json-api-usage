import { Exclude } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';
import { isNil } from 'lodash';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Wallet } from '@/database/entities/wallet.entity';
import { CoreEntity } from '@/database/helpers/core-entity';
import { Trip } from './trip.entity';

@Entity()
export class User extends CoreEntity {
  constructor(obj = {}) {
    super();
    Object.assign(this, obj);
  }

  @MaxLength(150)
  @Column({ type: 'varchar', length: 150, nullable: true })
  name?: string | null;

  @MaxLength(50)
  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  username: string | null;

  @MaxLength(255)
  @Exclude({ toPlainOnly: true })
  @IsEmail()
  @Column({ type: 'varchar', length: 255, unique: true, select: false })
  email: string;

  @MaxLength(255)
  @Column({ type: 'varchar', length: 255, nullable: true })
  bio?: string | null;

  @OneToMany(() => Wallet, (e) => e.user, { cascade: true, onDelete: 'NO ACTION', nullable: true })
  wallets?: Wallet[] | null;

  @OneToMany(() => Trip, (e) => e.traveler, { cascade: true, onDelete: 'NO ACTION', nullable: true })
  trips?: Trip[] | null;

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseEmail() {
    if (!isNil(this.email)) {
      this.email = this.email.toLowerCase();
    }
  }
}
