export const jwtConstants = {
  accessSecret: process.env.JWT_ACCESS_SECRET || 'DO_NOT_USE_THIS_VALUE_IN_PRODUCTION_JWT_ACCESS_SECRET',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'DO_NOT_USE_THIS_VALUE_IN_PRODUCTION_JWT_REFRESH_SECRET',
};
