import {
    DataTypes,
    Model,
    Optional,
    Sequelize
} from 'sequelize';

export interface ExerciseAttributes {
    id: number;
    name: string;
    description?: string;
    difficulty?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

type ExerciseCreationAttributes = Optional<ExerciseAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class Exercise extends Model<ExerciseAttributes, ExerciseCreationAttributes> implements ExerciseAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
    public difficulty?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
}

export function initExerciseModel(sequelize: Sequelize): typeof Exercise {
    Exercise.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            difficulty: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'exercises',
            timestamps: true,
            paranoid: true
        }
    );
    return Exercise;
}
