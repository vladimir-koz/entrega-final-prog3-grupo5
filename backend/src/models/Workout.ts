import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface WorkoutAttributes {
  id: number;
  timestamp: Date;
  nombre: string;
  userId: number;
  grupoMuscularEtiqueta?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type WorkoutCreationAttributes = Optional<
  WorkoutAttributes,
  'id' | 'timestamp' | 'grupoMuscularEtiqueta' | 'createdAt' | 'updatedAt'
>;

export class Workout extends Model<WorkoutAttributes, WorkoutCreationAttributes>
  implements WorkoutAttributes {
  public id!: number;
  public timestamp!: Date;
  public nombre!: string;
  public userId!: number;
  public grupoMuscularEtiqueta!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initWorkoutModel(sequelize: Sequelize): typeof Workout {
  Workout.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 120]
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grupoMuscularEtiqueta: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'workouts',
      timestamps: true
    }
  );

  return Workout;
}
