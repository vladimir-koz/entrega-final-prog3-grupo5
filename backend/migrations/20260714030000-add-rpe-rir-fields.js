'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('workout_template_exercises', 'rirObjetivo', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('workout_template_exercises', 'rpeObjetivo', {
      type: Sequelize.FLOAT,
      allowNull: true
    });

    await queryInterface.addColumn('workout_sets', 'rir', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('workout_sets', 'rpe', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('workout_sets', 'rpe');
    await queryInterface.removeColumn('workout_sets', 'rir');
    await queryInterface.removeColumn('workout_template_exercises', 'rpeObjetivo');
    await queryInterface.removeColumn('workout_template_exercises', 'rirObjetivo');
  }
};
