import { Exercise } from '../models';
import { AppError } from '../utils/AppError';

export async function getAllExercises() {
    const exercises = await Exercise.findAll();
    return { exercises };
}

export async function getExerciseById(id: number) {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
        throw new AppError('Ejercicio no encontrado', 404);
    }
    return { exercise };
}

export async function createExercise(data: { name: string; description?: string; difficulty?: string }) {
    if (!data.name) {
        throw new AppError('El nombre del ejercicio es obligatorio', 400);
    }

    const exercise = await Exercise.create({
        name: data.name,
        description: data.description,
        difficulty: data.difficulty
    });

    return {
        message: 'Ejercicio creado exitosamente',
        exercise
    };
}

export async function deleteExercise(id: number) {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
        throw new AppError('Ejercicio no encontrado', 404);
    }
    await exercise.destroy();
    return { message: 'Ejercicio eliminado exitosamente' };
}
