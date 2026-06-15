import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import { initUserModel, User } from './User';

type Environment = 'development' | 'test' | 'production';

const env = (process.env.NODE_ENV || 'development') as Environment;
const dbConfig = databaseConfig[env];

const sequelizeOptions = {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  pool: dbConfig.pool,
  dialectOptions: dbConfig.dialectOptions
};

export const sequelize = dbConfig.url
  ? new Sequelize(dbConfig.url, sequelizeOptions)
  : new Sequelize(
      dbConfig.database,
      dbConfig.username || '',
      dbConfig.password || '',
      sequelizeOptions
    );

initUserModel(sequelize);

export {
  Sequelize,
  User
};
