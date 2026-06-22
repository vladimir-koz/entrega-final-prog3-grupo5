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
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            dificultad: {
                type: Sequelize.STRING,
                allowNull: true
            },
            imagen: {
                type: Sequelize.STRING,
                allowNull: true
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

        await queryInterface.addIndex('exercises', ['userId']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('exercises');
    }
};
