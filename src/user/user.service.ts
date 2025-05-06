import { Injectable } from '@nestjs/common';
import { AddressDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../types/geo.types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const location = this.createLocationFromAddress(createUserDto.address);
    return this.UserModel.create({ ...createUserDto, location });
  }

  private createLocationFromAddress(address: AddressDto): Location {
    return {
      name: address.name?.trim(),
      type: 'Point',
      coordinates: [address.longitude, address.latitude],
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
