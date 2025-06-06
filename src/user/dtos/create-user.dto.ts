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
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../enums/role.enum';
import { Gender } from '../enums/gender.enum';
import { USER_VALIDATION } from '../../constants/user.constants';
import { i18nValidationMessage } from 'nestjs-i18n';
import { LocationDto } from './user-location.dto';

export class CreateUserDto {
  @MaxLength(USER_VALIDATION.NAME_MAX_LENGTH, {
    message: i18nValidationMessage('users.NAME_MAX_LENGTH', {
      max: USER_VALIDATION.NAME_MAX_LENGTH,
    }),
  })
  @MinLength(USER_VALIDATION.NAME_MIN_LENGTH, {
    message: i18nValidationMessage('users.NAME_MIN_LENGTH', {
      min: USER_VALIDATION.NAME_MIN_LENGTH,
    }),
  })
  @IsString({ message: i18nValidationMessage('users.NAME_REQUIRED') })
  name: string;

  @IsEmail({}, { message: i18nValidationMessage('users.EMAIL_INVALID') })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message: i18nValidationMessage('users.PASSWORD_WEAK'),
  })
  @MinLength(USER_VALIDATION.MIN_PASSWORD_LENGTH, {
    message: i18nValidationMessage('users.PASSWORD_MIN_LENGTH', {
      min: USER_VALIDATION.MIN_PASSWORD_LENGTH,
    }),
  })
  @IsString({ message: i18nValidationMessage('users.PASSWORD_REQUIRED') })
  readonly password: string;

  @IsEnum(Role, { message: i18nValidationMessage('users.INVALID_ROLE') })
  role?: Role;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('users.AVATAR_MUST_BE_STRING') })
  avatar?: string;

  @Max(USER_VALIDATION.AGE_MAX, {
    message: i18nValidationMessage('users.AGE_MAX', {
      max: USER_VALIDATION.AGE_MAX,
    }),
  })
  @Min(USER_VALIDATION.AGE_MIN, {
    message: i18nValidationMessage('users.AGE_MIN', {
      min: USER_VALIDATION.AGE_MIN,
    }),
  })
  @IsNumber({}, { message: i18nValidationMessage('users.AGE_MUST_BE_NUMBER') })
  age: number;

  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: i18nValidationMessage('users.PHONE_INVALID'),
  })
  @IsString({ message: i18nValidationMessage('users.PHONE_REQUIRED') })
  phone: string;

  @IsDefined({ message: i18nValidationMessage('users.ADDRESS_REQUIRED') })
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location: LocationDto;

  @IsEnum(Gender, { message: i18nValidationMessage('users.INVALID_GENDER') })
  gender: Gender;
}
