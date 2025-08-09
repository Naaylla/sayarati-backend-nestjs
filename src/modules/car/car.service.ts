import { Injectable, Inject } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {

  constructor(  
    @Inject('CAR_REPOSITORY')
    private carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto, accountId: number) {
        const car = this.carRepository.create({
      ...createCarDto,
      account: { id: accountId },
    });

    await this.carRepository.insert(car);
    return { car };
  }

  async findAll(accountId: number) {
    const cars = await this.carRepository.find({
      where : {
        account: {
          id: accountId
        }
      }
    })
    return { cars }
  }

  async findOne(id: number, accountId: number) {
    const car = this.carRepository.find({
      where: {
        id,
        account : {
          id: accountId
        }
      }
    })

    return { car }
  }

  async update(id: number, updateCarDto: UpdateCarDto, AccountID: number) {
    await this.carRepository.update(
      {
      id,
      account: {
        id: AccountID
      }},
      updateCarDto
    )
  }

  async remove(id: number, accountId: number) {
    await this.carRepository.delete({
      id,
      account: {id: accountId}
    })
  }
}
