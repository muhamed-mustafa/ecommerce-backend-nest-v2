import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LocationDto } from './dtos/user-location.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../types/geo.types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const location = this.toGeoPoint(createUserDto.location);
    return this.UserModel.create({ ...createUserDto, location });
  }

  private toGeoPoint({ longitude, latitude, name }: LocationDto): Location {
    return {
      type: 'Point',
      coordinates: [longitude, latitude],
      name: name?.trim(),
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.UserModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
