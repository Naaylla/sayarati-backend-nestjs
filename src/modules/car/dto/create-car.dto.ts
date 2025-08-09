import { 
  IsString, 
  Length, 
  IsNumber, 
  Min, 
  Max, 
  IsOptional, 
  IsEnum, 
  IsDateString 
} from 'class-validator';

import { FuelType, TransmissionType } from '../../../shared/enums/car.enums';

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

  @IsDateString()
  lastOilChangeDate: string;

  @IsDateString()
  lastTireChangeDate: string;

  @IsDateString()
  vehicleInspectionDate: string;
}
