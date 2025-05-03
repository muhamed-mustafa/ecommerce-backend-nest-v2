import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsOptional,
  IsNumber,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../enums/role.enum';
import { Gender } from '../enums/gender.enum';
import { USER_VALIDATION } from '../../constants/user.constants';
import { i18nValidationMessage } from 'nestjs-i18n'; 

class AddressDto {
  @IsString({ message: i18nValidationMessage('users.ADDRESS_NAME_REQUIRED') })
  @MinLength(USER_VALIDATION.address.NAME_MIN_LENGTH, {
    message: i18nValidationMessage('users.ADDRESS_NAME_MIN_LENGTH', { min: USER_VALIDATION.address.NAME_MIN_LENGTH }),
  })
  @MaxLength(USER_VALIDATION.address.NAME_MAX_LENGTH, {
    message: i18nValidationMessage('users.ADDRESS_NAME_MAX_LENGTH', { max: USER_VALIDATION.address.NAME_MAX_LENGTH }),
  })
  name: string;

  @IsNumber({}, { message: i18nValidationMessage('users.LATITUDE_MUST_BE_NUMBER') })
  @Min(USER_VALIDATION.address.latitudeMin, {
    message: i18nValidationMessage('users.LATITUDE_MIN', { min: USER_VALIDATION.address.latitudeMin }),
  })
  @Max(USER_VALIDATION.address.latitudeMax, {
    message: i18nValidationMessage('users.LATITUDE_MAX', { max: USER_VALIDATION.address.latitudeMax }),
  })
  latitude: number;

  @IsNumber({}, { message: i18nValidationMessage('users.LONGITUDE_MUST_BE_NUMBER') })
  @Min(USER_VALIDATION.address.longitudeMin, {
    message: i18nValidationMessage('users.LONGITUDE_MIN', { min: USER_VALIDATION.address.longitudeMin }),
  })
  @Max(USER_VALIDATION.address.longitudeMax, {
    message: i18nValidationMessage('users.LONGITUDE_MAX', { max: USER_VALIDATION.address.longitudeMax }),
  })
  longitude: number;
}

export class CreateUserDto {
  @IsString({ message: i18nValidationMessage('users.NAME_REQUIRED') })
  @MinLength(USER_VALIDATION.NAME_MIN_LENGTH, {
    message: i18nValidationMessage('users.NAME_MIN_LENGTH', { min: USER_VALIDATION.NAME_MIN_LENGTH }),
  })
  @MaxLength(USER_VALIDATION.NAME_MAX_LENGTH, {
    message: i18nValidationMessage('users.NAME_MAX_LENGTH', { max: USER_VALIDATION.NAME_MAX_LENGTH }),
  })
  name: string;

  @IsEmail({}, { message: i18nValidationMessage('users.EMAIL_INVALID') })
  email: string;

  @IsString({ message: i18nValidationMessage('users.PASSWORD_REQUIRED') })
  @MinLength(USER_VALIDATION.MIN_PASSWORD_LENGTH, {
    message: i18nValidationMessage('users.PASSWORD_MIN_LENGTH', { min: USER_VALIDATION.MIN_PASSWORD_LENGTH }),
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message: i18nValidationMessage('users.PASSWORD_WEAK'),
  })
  readonly password: string;

  @IsEnum(Role, { message: i18nValidationMessage('users.INVALID_ROLE') })
  role?: Role;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('users.AVATAR_MUST_BE_STRING') })
  avatar?: string;

  @IsNumber({}, { message: i18nValidationMessage('users.AGE_MUST_BE_NUMBER') })
  @Min(USER_VALIDATION.AGE_MIN, {
    message: i18nValidationMessage('users.AGE_MIN', { min: USER_VALIDATION.AGE_MIN }),
  })
  @Max(USER_VALIDATION.AGE_MAX, {
    message: i18nValidationMessage('users.AGE_MAX', { max: USER_VALIDATION.AGE_MAX }),
  })
  age: number;

  @IsString({ message: i18nValidationMessage('users.PHONE_REQUIRED') })
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: i18nValidationMessage('users.PHONE_INVALID'),
  })
  phone: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsEnum(Gender, { message: i18nValidationMessage('users.INVALID_GENDER') })
  gender: Gender;
}
