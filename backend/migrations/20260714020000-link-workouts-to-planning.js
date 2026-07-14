'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('workouts', 'workoutTemplateId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'workout_templates',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('workouts', 'scheduledWorkoutId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'scheduled_workouts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addIndex('workouts', ['workoutTemplateId'], {
      name: 'workouts_workout_template_id_index'
    });

    await queryInterface.addIndex('workouts', ['scheduledWorkoutId'], {
      name: 'workouts_scheduled_workout_id_index'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('workouts', 'workouts_scheduled_workout_id_index');
    await queryInterface.removeIndex('workouts', 'workouts_workout_template_id_index');
    await queryInterface.removeColumn('workouts', 'scheduledWorkoutId');
    await queryInterface.removeColumn('workouts', 'workoutTemplateId');
  }
};
