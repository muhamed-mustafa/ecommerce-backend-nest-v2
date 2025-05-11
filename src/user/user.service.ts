import { Injectable } from '@nestjs/common';
import { LocationDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../types/geo.types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const location = this.createLocation({ name: '', latitude: 0.0, longitude: 0.0 });
    return this.UserModel.create({ ...createUserDto, location });
  }

  private createLocation(location: LocationDto): Location {
    return {
      name: location.name?.trim(),
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
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
