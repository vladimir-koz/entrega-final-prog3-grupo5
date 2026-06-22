import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import { Exercise, initExerciseModel } from './Exercise';
import { ExerciseMuscleGroup, initExerciseMuscleGroupModel } from './ExerciseMuscleGroup';
import { initMuscleGroupModel, MuscleGroup } from './MuscleGroup';
import { initRoutineModel, Routine } from './Routine';
import { initRoutineSetModel, RoutineSet } from './RoutineSet';
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
initMuscleGroupModel(sequelize);
initExerciseMuscleGroupModel(sequelize);
initRoutineModel(sequelize);
initRoutineSetModel(sequelize);

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

User.hasMany(MuscleGroup, {
  foreignKey: 'userId',
  as: 'muscleGroups'
});

MuscleGroup.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Exercise.belongsToMany(MuscleGroup, {
  through: ExerciseMuscleGroup,
  foreignKey: 'exerciseId',
  otherKey: 'muscleGroupId',
  as: 'muscleGroups'
});

MuscleGroup.belongsToMany(Exercise, {
  through: ExerciseMuscleGroup,
  foreignKey: 'muscleGroupId',
  otherKey: 'exerciseId',
  as: 'exercises'
});

Exercise.hasMany(ExerciseMuscleGroup, {
  foreignKey: 'exerciseId',
  as: 'exerciseMuscleGroups'
});

ExerciseMuscleGroup.belongsTo(Exercise, {
  foreignKey: 'exerciseId',
  as: 'exercise'
});

MuscleGroup.hasMany(ExerciseMuscleGroup, {
  foreignKey: 'muscleGroupId',
  as: 'exerciseMuscleGroups'
});

ExerciseMuscleGroup.belongsTo(MuscleGroup, {
  foreignKey: 'muscleGroupId',
  as: 'muscleGroup'
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

export {
  Exercise,
  ExerciseMuscleGroup,
  MuscleGroup,
  Routine,
  RoutineSet,
  Sequelize,
  User,
};
