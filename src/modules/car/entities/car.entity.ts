import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { FuelType, TransmissionType } from '../../../shared/enums/car.enums';
import { Account } from '../../account/entities/account.entity';


@Entity()

@Unique(['matricule'])

export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;


  @Column('int')
  year: number;

  @Column('int')
  matricule: number;


  @Column({ nullable: true })
  color: string;

  @Column( {
    type: 'enum',
    enum: FuelType,
  })

  fuelType: FuelType

  
  
  @Column({
  type: 'enum',
  enum: TransmissionType,
})
transmissionType: TransmissionType;



@Column('date')
lastOilChangeDate: Date;

@Column('date')
lastTireChangeDate: Date;


@Column('date')
vehicleInspectionDate: Date;


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
