import { 
  IsString, 
  Length, 
  IsNumber, 
  Min, 
  Max, 
  IsOptional, 
  IsEnum, 
  IsDateString, 
  IsDate
} from 'class-validator';

import { FuelType, TransmissionType } from '../../../shared/enums/car.enums';
import { DateArg } from 'date-fns';

export class CreateCarDto {
  @IsString()
  @Length(2, 40)
  brand: string;

  @IsString()
  @Length(2, 40)
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  @Length(1, 20)
  matricule: string;  

  @IsOptional()
  @IsString()
  @Length(0, 20)
  color?: string;

  @IsEnum(FuelType)
  fuelType: FuelType;

  @IsEnum(TransmissionType)
  transmissionType: TransmissionType;

  @IsDate()
  lastOilChangeDate: Date;

  @IsDate()
  lastTireChangeDate: Date;

  @IsDate()
  vehicleInspectionDate: Date;
}
