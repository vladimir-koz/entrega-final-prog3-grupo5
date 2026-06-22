'use strict';

const routines = [
  {
    nombre: 'Full body inicial',
    descripcion: 'Rutina general para empezar a entrenar todo el cuerpo.',
    tipo: 'Full body',
    grupoMuscularEtiqueta: 'Cuerpo completo',
    dificultad: 'principiante',
    tiempoEstimado: 45,
    sets: [
      { exerciseName: 'Sentadilla', orden: 1, repeticiones: 12, peso: null },
      { exerciseName: 'Flexiones', orden: 2, repeticiones: 10, peso: null },
      { exerciseName: 'Remo con barra', orden: 3, repeticiones: 10, peso: null },
      { exerciseName: 'Plancha', orden: 4, repeticiones: 1, peso: null }
    ]
  },
  {
    nombre: 'Fuerza tren superior',
    descripcion: 'Rutina enfocada en empujes y tracciones de tren superior.',
    tipo: 'Fuerza',
    grupoMuscularEtiqueta: 'Tren superior',
    dificultad: 'intermedio',
    tiempoEstimado: 60,
    sets: [
      { exerciseName: 'Press de banca', orden: 1, repeticiones: 8, peso: null },
      { exerciseName: 'Remo con barra', orden: 2, repeticiones: 8, peso: null },
      { exerciseName: 'Press militar', orden: 3, repeticiones: 10, peso: null },
      { exerciseName: 'Dominadas', orden: 4, repeticiones: 8, peso: null }
    ]
  },
  {
    nombre: 'Piernas y gluteos',
    descripcion: 'Rutina para tren inferior con ejercicios bilaterales y unilaterales.',
    tipo: 'Hipertrofia',
    grupoMuscularEtiqueta: 'Piernas',
    dificultad: 'intermedio',
    tiempoEstimado: 55,
    sets: [
      { exerciseName: 'Sentadilla', orden: 1, repeticiones: 10, peso: null },
      { exerciseName: 'Peso muerto', orden: 2, repeticiones: 8, peso: null },
      { exerciseName: 'Zancadas', orden: 3, repeticiones: 12, peso: null },
      { exerciseName: 'Plancha', orden: 4, repeticiones: 1, peso: null }
    ]
  }
];

async function insertRoutine(queryInterface, routine) {
  await queryInterface.sequelize.query(
    `
      INSERT INTO "routines" (
        "nombre",
        "descripcion",
        "tipo",
        "userId",
        "grupoMuscularEtiqueta",
        "dificultad",
        "tiempoEstimado",
        "createdAt",
        "updatedAt"
      )
      SELECT
        :nombre,
        :descripcion,
        :tipo,
        NULL,
        :grupoMuscularEtiqueta,
        :dificultad,
        :tiempoEstimado,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      WHERE NOT EXISTS (
        SELECT 1
        FROM "routines"
        WHERE "nombre" = :nombre
          AND "userId" IS NULL
      );
    `,
    {
      replacements: {
        nombre: routine.nombre,
        descripcion: routine.descripcion,
        tipo: routine.tipo,
        grupoMuscularEtiqueta: routine.grupoMuscularEtiqueta,
        dificultad: routine.dificultad,
        tiempoEstimado: routine.tiempoEstimado
      }
    }
  );
}

async function insertRoutineSet(queryInterface, routineName, routineSet) {
  await queryInterface.sequelize.query(
    `
      INSERT INTO "routine_sets" (
        "routineId",
        "exerciseId",
        "orden",
        "repeticiones",
        "peso",
        "createdAt",
        "updatedAt"
      )
      SELECT
        r."id",
        e."id",
        :orden,
        :repeticiones,
        :peso,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      FROM "routines" r
      INNER JOIN "exercises" e
        ON e."nombre" = :exerciseName
       AND e."userId" IS NULL
      WHERE r."nombre" = :routineName
        AND r."userId" IS NULL
        AND NOT EXISTS (
          SELECT 1
          FROM "routine_sets" rs
          WHERE rs."routineId" = r."id"
            AND rs."orden" = :orden
        );
    `,
    {
      replacements: {
        routineName,
        exerciseName: routineSet.exerciseName,
        orden: routineSet.orden,
        repeticiones: routineSet.repeticiones,
        peso: routineSet.peso
      }
    }
  );
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    for (const routine of routines) {
      await insertRoutine(queryInterface, routine);

      for (const routineSet of routine.sets) {
        await insertRoutineSet(queryInterface, routine.nombre, routineSet);
      }
    }
  },

  async down(queryInterface) {
    for (const routine of routines) {
      await queryInterface.sequelize.query(
        `
          DELETE FROM "routine_sets"
          WHERE "routineId" IN (
            SELECT "id"
            FROM "routines"
            WHERE "nombre" = :nombre
              AND "userId" IS NULL
          );
        `,
        {
          replacements: { nombre: routine.nombre }
        }
      );

      await queryInterface.sequelize.query(
        `
          DELETE FROM "routines"
          WHERE "nombre" = :nombre
            AND "userId" IS NULL;
        `,
        {
          replacements: { nombre: routine.nombre }
        }
      );
    }
  }
};
