import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsOptional, Length, Matches, IsUrl } from 'class-validator';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  @Length(2, 20)
  firstName: string;

  @Column({ length: 20 })
  @Length(2, 20)
  lastName: string;

  @Column()
  @IsEmail()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Profile picture must be a valid URL' })
  profilePicture?: string;
}
