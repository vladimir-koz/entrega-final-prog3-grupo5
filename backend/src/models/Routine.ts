import {
    DataTypes,
    Model,
    Optional,
    Sequelize
} from 'sequelize';

export interface RoutineAttributes {
    id: number;
    nombre: string;
    descripcion?: string | null;
    objetivo?: string | null;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

type RoutineCreationAttributes = Optional<
    RoutineAttributes,
    'id' | 'descripcion' | 'objetivo' | 'createdAt' | 'updatedAt'
>;

export class Routine extends Model<RoutineAttributes, RoutineCreationAttributes> implements RoutineAttributes {
    public id!: number;
    public nombre!: string;
    public descripcion!: string | null;
    public objetivo!: string | null;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initRoutineModel(sequelize: Sequelize): typeof Routine {
    Routine.init(
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
            objetivo: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'routines',
            timestamps: true
        }
    );

    return Routine;
}
