'use strict';

async function addColumnIfMissing(queryInterface, tableName, columns, columnName, definition) {
    if (!columns[columnName]) {
        await queryInterface.addColumn(tableName, columnName, definition);
    }
}

async function removeColumnIfExists(queryInterface, tableName, columns, columnName) {
    if (columns[columnName]) {
        await queryInterface.removeColumn(tableName, columnName);
    }
}

async function addIndexIfMissing(queryInterface, tableName, indexName, fields) {
    const indexes = await queryInterface.showIndex(tableName);
    const exists = indexes.some((index) => index.name === indexName);

    if (!exists) {
        await queryInterface.addIndex(tableName, fields, { name: indexName });
    }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const exerciseColumns = await queryInterface.describeTable('exercises');

        await removeColumnIfExists(queryInterface, 'exercises', exerciseColumns, 'grupoMuscular');
        await removeColumnIfExists(queryInterface, 'exercises', exerciseColumns, 'equipamiento');

        const updatedExerciseColumns = await queryInterface.describeTable('exercises');

        await addColumnIfMissing(queryInterface, 'exercises', updatedExerciseColumns, 'userId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await addColumnIfMissing(queryInterface, 'exercises', updatedExerciseColumns, 'imagen', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await queryInterface.changeColumn('exercises', 'dificultad', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addIndexIfMissing(queryInterface, 'exercises', 'exercises_user_id_index', ['userId']);

        const routineColumns = await queryInterface.describeTable('routines');

        await removeColumnIfExists(queryInterface, 'routines', routineColumns, 'objetivo');

        const updatedRoutineColumns = await queryInterface.describeTable('routines');

        await addColumnIfMissing(queryInterface, 'routines', updatedRoutineColumns, 'tipo', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addColumnIfMissing(queryInterface, 'routines', updatedRoutineColumns, 'grupoMuscularEtiqueta', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addColumnIfMissing(queryInterface, 'routines', updatedRoutineColumns, 'dificultad', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await addColumnIfMissing(queryInterface, 'routines', updatedRoutineColumns, 'tiempoEstimado', {
            type: Sequelize.INTEGER,
            allowNull: true
        });

        await queryInterface.changeColumn('routines', 'userId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await addIndexIfMissing(queryInterface, 'routines', 'routines_user_id_index', ['userId']);
    },

    async down(queryInterface, Sequelize) {
        const exerciseColumns = await queryInterface.describeTable('exercises');

        await removeColumnIfExists(queryInterface, 'exercises', exerciseColumns, 'imagen');
        await removeColumnIfExists(queryInterface, 'exercises', exerciseColumns, 'userId');

        const exerciseColumnsAfterRemove = await queryInterface.describeTable('exercises');

        await addColumnIfMissing(queryInterface, 'exercises', exerciseColumnsAfterRemove, 'grupoMuscular', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'General'
        });

        await addColumnIfMissing(queryInterface, 'exercises', exerciseColumnsAfterRemove, 'equipamiento', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await queryInterface.changeColumn('exercises', 'dificultad', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'principiante'
        });

        const routineColumns = await queryInterface.describeTable('routines');

        await removeColumnIfExists(queryInterface, 'routines', routineColumns, 'tipo');
        await removeColumnIfExists(queryInterface, 'routines', routineColumns, 'grupoMuscularEtiqueta');
        await removeColumnIfExists(queryInterface, 'routines', routineColumns, 'dificultad');
        await removeColumnIfExists(queryInterface, 'routines', routineColumns, 'tiempoEstimado');

        const routineColumnsAfterRemove = await queryInterface.describeTable('routines');

        await addColumnIfMissing(queryInterface, 'routines', routineColumnsAfterRemove, 'objetivo', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await queryInterface.changeColumn('routines', 'userId', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    }
};
