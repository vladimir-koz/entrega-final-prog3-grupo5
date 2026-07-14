import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import { Exercise, initExerciseModel } from './Exercise';
import { ExerciseMuscleGroup, initExerciseMuscleGroupModel } from './ExerciseMuscleGroup';
import { initMuscleGroupModel, MuscleGroup } from './MuscleGroup';
import { initWorkoutTemplateModel, WorkoutTemplate } from './WorkoutTemplate';
import { initWorkoutTemplateExerciseModel, WorkoutTemplateExercise } from './WorkoutTemplateExercise';
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
initMuscleGroupModel(sequelize);
initExerciseMuscleGroupModel(sequelize);
initWorkoutTemplateModel(sequelize);
initWorkoutTemplateExerciseModel(sequelize);
initWorkoutModel(sequelize);
initWorkoutSetModel(sequelize);

User.hasMany(WorkoutTemplate, {
  foreignKey: 'userId',
  as: 'workoutTemplates'
});

User.hasMany(Workout, { foreignKey: 'userId', as: 'workouts' });
Workout.belongsTo(User, { foreignKey: 'userId', as: 'user' });

WorkoutTemplate.belongsTo(User, {
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

WorkoutTemplate.hasMany(WorkoutTemplateExercise, {
  foreignKey: 'workoutTemplateId',
  as: 'workoutTemplateExercises'
});

WorkoutTemplateExercise.belongsTo(WorkoutTemplate, {
  foreignKey: 'workoutTemplateId',
  as: 'workoutTemplate'
});

Exercise.hasMany(WorkoutTemplateExercise, {
  foreignKey: 'exerciseId',
  as: 'workoutTemplateExercises'
});

WorkoutTemplateExercise.belongsTo(Exercise, {
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
  ExerciseMuscleGroup,
  MuscleGroup,
  WorkoutTemplate,
  WorkoutTemplateExercise,
  Workout,
  WorkoutSet
};
