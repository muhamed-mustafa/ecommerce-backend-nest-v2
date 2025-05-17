import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import * as crypto from 'crypto';
import { Role } from '../enums/role.enum';
import { Gender } from '../enums/gender.enum';
import { USER_VALIDATION } from '../../constants/user.constants';
import { Location } from '../../types/geo.types';
import { Optional } from '@nestjs/common';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
    required: [true, 'Name is required'],
    minlength: [
      USER_VALIDATION.NAME_MIN_LENGTH,
      `Name must be at least ${USER_VALIDATION.NAME_MIN_LENGTH} characters`,
    ],
    maxlength: [
      USER_VALIDATION.NAME_MAX_LENGTH,
      `Name must be at most ${USER_VALIDATION.NAME_MAX_LENGTH} characters`,
    ],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
    select: false,
    minlength: [
      USER_VALIDATION.MIN_PASSWORD_LENGTH,
      `Password must be at least ${USER_VALIDATION.MIN_PASSWORD_LENGTH} characters`,
    ],
  })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(Role),
    default: Role.USER,
  })
  role: Role;

  @Prop(String)
  @Optional()
  avatar: string;

  @Prop({
    type: Number,
    required: [true, 'Age is required'],
    min: [
      USER_VALIDATION.AGE_MIN,
      `Age must be at least ${USER_VALIDATION.AGE_MIN}`,
    ],
    max: [
      USER_VALIDATION.AGE_MAX,
      `Age must be at most ${USER_VALIDATION.AGE_MAX}`,
    ],
  })
  age: number;

  @Prop({
    type: String,
    required: [true, 'Phone is required'],
    unique: true,
    trim: true,
    match: [USER_VALIDATION.PHONE_REGEX, 'Please enter a valid phone number'],
  })
  phone: string;

  @Prop({
    name: { type: String, required: true },
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number],
  })
  location: Location;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop(String)
  verificationCode?: string;

  @Prop(Date)
  activationExpires?: Date;

  @Prop({
    type: String,
    enum: Object.values(Gender),
    default: Gender.MALE,
  })
  gender: Gender;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ 'address.coordinates': '2dsphere' });

UserSchema.pre<User>('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = crypto.randomBytes(16).toString('hex');

    this.password = crypto
      .createHash('sha512')
      .update(salt + this.password)
      .digest('hex');

    this.password = `${salt}:${this.password}`;
  }
  next();
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
): boolean {
  const [salt, storedHash] = this.password.split(':');

  const hashedCandidate = crypto
    .createHash('sha512')
    .update(salt + candidatePassword)
    .digest('hex');

  return storedHash === hashedCandidate;
};
