import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Account } from 'src/core/guards/account.guard';

@UseGuards(AuthGuard)
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto, @Account('id') accountId: number) {
    return this.carService.create(createCarDto, accountId);
  }

  @Get()
  findAll(@Account('id') accountId: number) {
    return this.carService.findAll(accountId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Account('id') accountId: number) {
    return this.carService.findOne(+id, accountId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @Account('id') accountId: number,
  ) {
    return this.carService.update(+id, updateCarDto, accountId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Account('id') accountId: number) {
    return this.carService.remove(+id, accountId);
  }
}
