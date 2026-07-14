'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
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

    await queryInterface.addIndex('exercises', ['userId'], {
      name: 'exercises_user_id_index'
    });

    await queryInterface.createTable('workout_templates', {
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
      tipo: {
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
      grupoMuscularEtiqueta: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dificultad: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tiempoEstimado: {
        type: Sequelize.INTEGER,
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

    await queryInterface.addIndex('workout_templates', ['userId'], {
      name: 'workout_templates_user_id_index'
    });

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

    await queryInterface.addIndex('muscle_groups', ['userId'], {
      name: 'muscle_groups_user_id_index'
    });

    await queryInterface.createTable('workouts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      grupoMuscularEtiqueta: {
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

    await queryInterface.addIndex('workouts', ['userId'], {
      name: 'workouts_user_id_index'
    });

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

    await queryInterface.addIndex('exercise_muscle_groups', ['exerciseId'], {
      name: 'exercise_muscle_groups_exercise_id_index'
    });

    await queryInterface.addIndex('exercise_muscle_groups', ['muscleGroupId'], {
      name: 'exercise_muscle_groups_muscle_group_id_index'
    });

    await queryInterface.createTable('workout_template_exercises', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      exerciseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      orden: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      repeticiones: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      peso: {
        type: Sequelize.FLOAT,
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

    await queryInterface.addIndex('workout_template_exercises', ['workoutTemplateId'], {
      name: 'workout_template_exercises_workout_template_id_index'
    });

    await queryInterface.addIndex('workout_template_exercises', ['exerciseId'], {
      name: 'workout_template_exercises_exercise_id_index'
    });

    await queryInterface.createTable('workout_sets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      repeticiones: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      exerciseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      workoutId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workouts',
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

    await queryInterface.addIndex('workout_sets', ['workoutId'], {
      name: 'workout_sets_workout_id_index'
    });

    await queryInterface.addIndex('workout_sets', ['exerciseId'], {
      name: 'workout_sets_exercise_id_index'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('workout_sets');
    await queryInterface.dropTable('workout_template_exercises');
    await queryInterface.dropTable('exercise_muscle_groups');
    await queryInterface.dropTable('workouts');
    await queryInterface.dropTable('muscle_groups');
    await queryInterface.dropTable('workout_templates');
    await queryInterface.dropTable('exercises');
    await queryInterface.dropTable('users');
  }
};
