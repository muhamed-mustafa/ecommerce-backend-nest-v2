import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { USER_VALIDATION } from "src/constants/user.constants";

export class LocationDto {
  @MaxLength(USER_VALIDATION.address.NAME_MAX_LENGTH, {
    message: i18nValidationMessage('users.ADDRESS_NAME_MAX_LENGTH', {
      max: USER_VALIDATION.address.NAME_MAX_LENGTH,
    }),
  })
  @MinLength(USER_VALIDATION.address.NAME_MIN_LENGTH, {
    message: i18nValidationMessage('users.ADDRESS_NAME_MIN_LENGTH', {
      min: USER_VALIDATION.address.NAME_MIN_LENGTH,
    }),
  })
  @IsString({ message: i18nValidationMessage('users.ADDRESS_NAME_REQUIRED') })
  name: string;

  @Max(USER_VALIDATION.address.latitudeMax, {
    message: i18nValidationMessage('users.LATITUDE_MAX', {
      max: USER_VALIDATION.address.latitudeMax,
    }),
  })
  @Min(USER_VALIDATION.address.latitudeMin, {
    message: i18nValidationMessage('users.LATITUDE_MIN', {
      min: USER_VALIDATION.address.latitudeMin,
    }),
  })
  @IsNumber(
    {},
    { message: i18nValidationMessage('users.LATITUDE_MUST_BE_NUMBER') },
  )
  latitude: number;

  @Max(USER_VALIDATION.address.longitudeMax, {
    message: i18nValidationMessage('users.LONGITUDE_MAX', {
      max: USER_VALIDATION.address.longitudeMax,
    }),
  })
  @Min(USER_VALIDATION.address.longitudeMin, {
    message: i18nValidationMessage('users.LONGITUDE_MIN', {
      min: USER_VALIDATION.address.longitudeMin,
    }),
  })
  @IsNumber(
    {},
    { message: i18nValidationMessage('users.LONGITUDE_MUST_BE_NUMBER') },
  )
  longitude: number;
}