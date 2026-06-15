'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('exercises', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            descripcion: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            grupoMuscular: {
                type: Sequelize.STRING,
                allowNull: false
            },
            equipamiento: {
                type: Sequelize.STRING,
                allowNull: true
            },
            dificultad: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'principiante'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('exercises');
    }
};
