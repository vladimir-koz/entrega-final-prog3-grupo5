import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import { Exercise, initExerciseModel } from './Exercise';
import { initRoutineModel, Routine } from './Routine';
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
initExerciseModel(sequelize);
initRoutineModel(sequelize);

User.hasMany(Routine, {
  foreignKey: 'userId',
  as: 'routines'
});

Routine.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

User.hasMany(Exercise, {
  foreignKey: 'userId',
  as: 'exercises'
});

Exercise.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export {
  Exercise,
  Routine,
  Sequelize,
  User,
};
