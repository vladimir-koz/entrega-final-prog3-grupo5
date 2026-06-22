'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('muscle_groups', {
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

    await queryInterface.addIndex('muscle_groups', ['userId']);

    await queryInterface.bulkInsert('muscle_groups', [
      { nombre: 'Chest', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Back', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Legs', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Shoulders', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Biceps', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Triceps', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Core', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Glutes', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Cardio', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Full body', userId: null, createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.createTable('exercise_muscle_groups', {
      exerciseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      muscleGroupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'muscle_groups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.addIndex('exercise_muscle_groups', ['exerciseId']);
    await queryInterface.addIndex('exercise_muscle_groups', ['muscleGroupId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('exercise_muscle_groups');
    await queryInterface.dropTable('muscle_groups');
  }
};
