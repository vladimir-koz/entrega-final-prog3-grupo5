import {
  DataTypes,
  Model,
  Optional,
  Sequelize
} from 'sequelize';

export interface RoutineSetAttributes {
  id: number;
  routineId: number;
  exerciseId: number;
  orden: number;
  repeticiones: number;
  peso?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type RoutineSetCreationAttributes = Optional<
  RoutineSetAttributes,
  'id' | 'peso' | 'createdAt' | 'updatedAt'
>;

export class RoutineSet extends Model<RoutineSetAttributes, RoutineSetCreationAttributes> implements RoutineSetAttributes {
  public id!: number;
  public routineId!: number;
  public exerciseId!: number;
  public orden!: number;
  public repeticiones!: number;
  public peso!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initRoutineSetModel(sequelize: Sequelize): typeof RoutineSet {
  RoutineSet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      routineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'routines',
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
      tableName: 'routine_sets',
      timestamps: true
    }
  );

  return RoutineSet;
}
