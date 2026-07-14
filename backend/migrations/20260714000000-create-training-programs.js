'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('training_programs', {
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
      objetivo: {
        type: Sequelize.STRING,
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
      fechaInicio: {
        type: Sequelize.DATE,
        allowNull: true
      },
      fechaFin: {
        type: Sequelize.DATE,
        allowNull: true
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'activo'
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

    await queryInterface.addIndex('training_programs', ['userId'], {
      name: 'training_programs_user_id_index'
    });

    await queryInterface.createTable('program_weeks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      trainingProgramId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'training_programs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      numeroSemana: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      objetivo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notas: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      esDescarga: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

    await queryInterface.addIndex('program_weeks', ['trainingProgramId'], {
      name: 'program_weeks_training_program_id_index'
    });

    await queryInterface.addIndex('program_weeks', ['trainingProgramId', 'numeroSemana'], {
      unique: true,
      name: 'program_weeks_training_program_week_unique'
    });

    await queryInterface.createTable('scheduled_workouts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      programWeekId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'program_weeks',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      workoutTemplateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workout_templates',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      diaSemana: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fechaProgramada: {
        type: Sequelize.DATE,
        allowNull: true
      },
      orden: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      notas: {
        type: Sequelize.TEXT,
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

    await queryInterface.addIndex('scheduled_workouts', ['programWeekId'], {
      name: 'scheduled_workouts_program_week_id_index'
    });

    await queryInterface.addIndex('scheduled_workouts', ['workoutTemplateId'], {
      name: 'scheduled_workouts_workout_template_id_index'
    });

    await queryInterface.addIndex('scheduled_workouts', ['programWeekId', 'orden'], {
      unique: true,
      name: 'scheduled_workouts_program_week_order_unique'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('scheduled_workouts');
    await queryInterface.dropTable('program_weeks');
    await queryInterface.dropTable('training_programs');
  }
};
