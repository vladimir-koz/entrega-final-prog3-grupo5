import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import { Exercise, initExerciseModel } from './Exercise';
import { initRoutineModel, Routine } from './Routine';
import { initRoutineSetModel, RoutineSet } from './RoutineSet';
import { initUserModel, User } from './User';
import { initWorkoutModel, Workout } from './Workout';
import { initWorkoutSetModel, WorkoutSet } from './WorkoutSet';

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
initRoutineSetModel(sequelize);
initWorkoutModel(sequelize);
initWorkoutSetModel(sequelize);

User.hasMany(Routine, {
  foreignKey: 'userId',
  as: 'routines'
});

User.hasMany(Workout, { foreignKey: 'userId', as: 'workouts' });
Workout.belongsTo(User, { foreignKey: 'userId', as: 'user' });

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

Routine.hasMany(RoutineSet, {
  foreignKey: 'routineId',
  as: 'routineSets'
});

RoutineSet.belongsTo(Routine, {
  foreignKey: 'routineId',
  as: 'routine'
});

Exercise.hasMany(RoutineSet, {
  foreignKey: 'exerciseId',
  as: 'routineSets'
});

RoutineSet.belongsTo(Exercise, {
  foreignKey: 'exerciseId',
  as: 'exercise'
});

Workout.hasMany(WorkoutSet, {
  foreignKey: 'workoutId',
  as: 'series',
  onDelete: 'CASCADE'
});
WorkoutSet.belongsTo(Workout, { foreignKey: 'workoutId', as: 'workout' });

Exercise.hasMany(WorkoutSet, { foreignKey: 'exerciseId', as: 'workoutSets' });
WorkoutSet.belongsTo(Exercise, { foreignKey: 'exerciseId', as: 'exercise' });

export {
  Sequelize,
  User,
  Exercise,
  Routine,
  RoutineSet,
  Workout,
  WorkoutSet
};
