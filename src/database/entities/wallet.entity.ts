import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@/database/entities/user.entity';
import { CoreEntity } from '@/database/helpers/core-entity';
import { WalletService } from '@/enums/wallet.enum';

@Entity()
export class Wallet extends CoreEntity {
  constructor(obj = {}) {
    super();
    Object.assign(this, obj);
  }

  @Column({ type: 'bigint', unsigned: true, name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (e) => e.wallets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @Column({ type: 'int' })
  service: WalletService;

  @Column({ type: 'varchar', unique: true })
  address: string;

  @Column({ type: 'numeric', default: 0 })
  amount: number;
}
