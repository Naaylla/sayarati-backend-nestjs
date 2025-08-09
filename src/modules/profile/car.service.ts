import { Injectable, Inject } from '@nestjs/common';
// import { CreateCarDto } from './dto/create-car.dto';
// import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {

  // constructor(  
  //   @Inject('CAR_REPOSITORY')
  
  // ) {}




  // create(createCarDto: CreateCarDto) {
  // }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  // update(id: number, updateCarDto: UpdateCarDto) {
  //   return `This action updates a #${id} car`;
  // }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
