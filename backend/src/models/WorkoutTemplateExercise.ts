import {
  DataTypes,
  Model,
  Optional,
  Sequelize
} from 'sequelize';

export interface WorkoutTemplateExerciseAttributes {
  id: number;
  workoutTemplateId: number;
  exerciseId: number;
  orden: number;
  repeticiones: number;
  peso?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type WorkoutTemplateExerciseCreationAttributes = Optional<
  WorkoutTemplateExerciseAttributes,
  'id' | 'peso' | 'createdAt' | 'updatedAt'
>;

export class WorkoutTemplateExercise extends Model<WorkoutTemplateExerciseAttributes, WorkoutTemplateExerciseCreationAttributes> implements WorkoutTemplateExerciseAttributes {
  public id!: number;
  public workoutTemplateId!: number;
  public exerciseId!: number;
  public orden!: number;
  public repeticiones!: number;
  public peso!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initWorkoutTemplateExerciseModel(sequelize: Sequelize): typeof WorkoutTemplateExercise {
  WorkoutTemplateExercise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      workoutTemplateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'workout_templates',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      orden: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      repeticiones: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'workout_template_exercises',
      timestamps: true
    }
  );

  return WorkoutTemplateExercise;
}
