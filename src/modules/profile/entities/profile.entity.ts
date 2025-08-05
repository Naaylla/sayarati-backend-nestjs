import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { Length, IsString, IsOptional, IsUrl } from 'class-validator';
import { Account } from '../../account/entities/account.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  @IsString()
  @Length(2, 20)
  firstName: string;

  @Column({ length: 20 })
  @Length(2, 20)
  lastName: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Profile picture must be a valid URL' })
  profilePicture?: string;

  @ManyToOne(() => Account, (account) => account.profiles)
  account: Relation<Account>;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
