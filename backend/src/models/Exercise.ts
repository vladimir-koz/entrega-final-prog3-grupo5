import {
    DataTypes,
    Model,
    Optional,
    Sequelize
} from 'sequelize';

export type ExerciseDifficulty = 'principiante' | 'intermedio' | 'avanzado';

export interface ExerciseAttributes {
    id: number;
    nombre: string;
    descripcion?: string | null;
    grupoMuscular: string;
    equipamiento?: string | null;
    dificultad: ExerciseDifficulty;
    createdAt?: Date;
    updatedAt?: Date;
}

type ExerciseCreationAttributes = Optional<
    ExerciseAttributes,
    'id' | 'descripcion' | 'equipamiento' | 'dificultad' | 'createdAt' | 'updatedAt'
>;

export class Exercise extends Model<ExerciseAttributes, ExerciseCreationAttributes> implements ExerciseAttributes {
    public id!: number;
    public nombre!: string;
    public descripcion!: string | null;
    public grupoMuscular!: string;
    public equipamiento!: string | null;
    public dificultad!: ExerciseDifficulty;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initExerciseModel(sequelize: Sequelize): typeof Exercise {
    Exercise.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [2, 100]
                }
            },
            descripcion: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            grupoMuscular: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [2, 100]
                }
            },
            equipamiento: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dificultad: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'principiante',
                validate: {
                    isIn: [['principiante', 'intermedio', 'avanzado']]
                }
            }
        },
        {
            sequelize,
            tableName: 'exercises',
            timestamps: true
        }
    );

    return Exercise;
}
