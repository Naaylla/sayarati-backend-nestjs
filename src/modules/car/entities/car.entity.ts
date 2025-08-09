import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


enum FuelType {
    ESSENCE = 'essence',
    DIESEL = 'diesel',
    ELECTRIC = 'electric'
} //i'm not sure which file where to put this

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
  enum: ['automatic', 'manual'],
})
transmissionType: 'automatic' | 'manual';



@Column('date')
  dob: Date;

@Column('date')
lastOilChangeDate: Date;

@Column('date')
lastTireChangeDate: Date;


@Column('date')
vehicleInspectionDate: Date;


//i'm leaving this here for adding reference to "reminders" iD later on
//   @OneToMany(() => Profile, (profile) => profile.account, {
//     onDelete: 'CASCADE',
//   })
//   profiles: Relation<Profile>[];


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
