import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';
import { isNil } from 'lodash';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '@/database/entities/user.entity';
import { CoreEntity } from '@/database/helpers/core-entity';

@Entity()
export class UserPrivate extends CoreEntity {
  constructor(obj = {}) {
    super();
    Object.assign(this, obj);
  }

  @MaxLength(255)
  @IsEmail()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', select: false })
  password?: string;

  @Column({ type: 'bigint', unsigned: true, update: false, unique: true })
  userId: string;

  @OneToOne(() => User, (e) => e, { cascade: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  async lowercaseEmail() {
    if (!isNil(this.email)) {
      this.email = this.email.toLowerCase();
    }
    if (!isNil(this.password)) {
      this.password = await argon2.hash(this.password);
    }
  }
}
