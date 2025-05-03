export const USER_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 32,
  AGE_MIN: 10,
  AGE_MAX: 100,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  MIN_PASSWORD_LENGTH: 8,
  address: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 32,
    latitudeMin: -90,
    latitudeMax: 90,
    longitudeMin: -180,
    longitudeMax: 180,
  }
} as const;
