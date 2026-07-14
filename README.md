# segundo-parcial-prog3-grupo5

Aplicacion fullstack de entrenamientos para Programacion 3.

El foco actual del proyecto es el backend: una API REST con Express, TypeScript, Sequelize, PostgreSQL, Docker, autenticacion JWT y despliegue en Render.

## Estructura del Proyecto

```txt
.
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── config/
│   ├── migrations/
│   ├── seeders/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── package.json
│   └── tsconfig.json
└── frontend/
```

El frontend queda pendiente para la proxima fecha.

## Tecnologias del Backend

- Node.js
- Express
- TypeScript
- Sequelize
- PostgreSQL
- Docker / Docker Compose
- Autenticacion con JWT
- Deploy en Render

## Variables de Entorno

Crear `backend/.env` para desarrollo local:

```env
NODE_ENV=development
PORT=3001

DB_HOST=localhost
DB_PORT=5432
DB_NAME=app_database
DB_USER=app_user
DB_PASSWORD=app_password

JWT_SECRET=cambiar_por_una_clave_larga
CORS_ORIGIN=http://localhost:3000
```

Para Render:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
DB_SSL=true
JWT_SECRET=real_long_secret
CORS_ORIGIN=https://frontend-url
```

`DATABASE_URL` reemplaza a `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`.

## Scripts

Ejecutar estos comandos desde `backend/`:

```bash
npm run dev
```

Levanta la API en modo desarrollo.

```bash
npm run build
```

Compila TypeScript a `dist/`.

```bash
npm start
```

Ejecuta `dist/server.js`.

```bash
npm run migrate
```

Ejecuta las migraciones de Sequelize.

```bash
npm run seed
```

Carga datos iniciales con los seeders.

```bash
npm run start:migrate
```

Ejecuta migraciones y luego inicia el servidor. Se usa para Render cuando no hay acceso a shell en el plan gratuito.

```bash
npm run start:migrate:seed
```

Ejecuta migraciones, seeders y luego inicia el servidor. Es el comando usado por el `Dockerfile` de produccion.

## Base de Datos

El backend usa migraciones de Sequelize para crear y actualizar el esquema de PostgreSQL.

Actualmente el esquema inicial esta consolidado en una unica migracion:

```txt
backend/migrations/20260622000000-create-training-schema.js
```

Tablas actuales:

- `users`
- `exercises`
- `workout_templates`
- `workout_template_exercises`
- `muscle_groups`
- `exercise_muscle_groups`
- `workouts`
- `workout_sets`

Los datos iniciales se cargan con seeders:

```txt
backend/seeders/20260622010000-seed-muscle-groups.js
backend/seeders/20260622020000-seed-exercises.js
backend/seeders/20260622030000-seed-workout-templates.js
```

Datos precargados:

- 10 grupos musculares globales
- 12 ejercicios globales
- relaciones entre ejercicios y grupos musculares
- 3 plantillas de entrenamiento globales
- 12 ejercicios planificados dentro de plantillas

Para reiniciar la base local desde cero con Docker:

```bash
docker compose down -v
docker compose up -d --build
docker compose exec backend npm run migrate
docker compose exec backend npm run seed
```

## Autenticacion

La API usa JWT.

Las rutas protegidas requieren:

```txt
Authorization: Bearer TOKEN
```

El usuario autenticado se obtiene desde el token. Los recursos protegidos no deben confiar en un `userId` enviado por body.

## Propiedad de Recursos

Algunos recursos pueden ser globales o personales:

```txt
userId = null              -> recurso global
userId = usuario logueado  -> recurso personal
```

Reglas de lectura:

- Un usuario puede ver recursos globales.
- Un usuario puede ver sus propios recursos.

Reglas de escritura:

- Un usuario puede crear recursos personales.
- Un usuario no puede modificar ni eliminar recursos globales.
- Un usuario no puede acceder a recursos personales de otro usuario.

Actualmente aplica a:

- ejercicios
- plantillas de entrenamiento
- grupos musculares

## Endpoints de la API

URL base en desarrollo local:

```txt
http://localhost:3001
```

Ruta base de la API:

```txt
/api
```

### Health

```http
GET /health
GET /api/health
```

### Auth

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/perfil
```

Body para registro:

```json
{
  "nombre": "Vladimir",
  "email": "vladimir@test.com",
  "password": "vlad123"
}
```

Body para login:

```json
{
  "email": "vladimir@test.com",
  "password": "vlad123"
}
```

### Exercises

```http
GET    /api/exercises
GET    /api/exercises/:id
POST   /api/exercises
PUT    /api/exercises/:id
DELETE /api/exercises/:id
```

Body para crear:

```json
{
  "nombre": "Sentadilla",
  "descripcion": "Ejercicio compuesto de tren inferior",
  "dificultad": "intermedio",
  "imagen": "sentadilla.jpg",
  "muscleGroupIds": [3, 8]
}
```

### Muscle Groups

```http
GET    /api/muscle-groups
GET    /api/muscle-groups/:id
POST   /api/muscle-groups
PUT    /api/muscle-groups/:id
DELETE /api/muscle-groups/:id
```

Body para crear:

```json
{
  "nombre": "Antebrazos"
}
```

### WorkoutTemplates

```http
GET    /api/workout-templates
GET    /api/workout-templates/:id
POST   /api/workout-templates
PUT    /api/workout-templates/:id
DELETE /api/workout-templates/:id
```

Body para crear:

```json
{
  "nombre": "Fuerza tren inferior",
  "descripcion": "Plantilla enfocada en fuerza para tren inferior",
  "tipo": "Fuerza",
  "grupoMuscularEtiqueta": "Piernas",
  "dificultad": "intermedio",
  "tiempoEstimado": 60
}
```

### WorkoutTemplate Exercises

```http
GET    /api/workout-template-exercises?workoutTemplateId=1
GET    /api/workout-template-exercises/:id
POST   /api/workout-template-exercises
PUT    /api/workout-template-exercises/:id
DELETE /api/workout-template-exercises/:id
```

Body para crear:

```json
{
  "workoutTemplateId": 1,
  "exerciseId": 2,
  "orden": 1,
  "repeticiones": 10,
  "peso": 80
}
```

`WorkoutTemplateExercise` representa un ejercicio planificado dentro de una plantilla de entrenamiento.

### Workouts

```http
GET    /api/workouts
GET    /api/workouts/:id
POST   /api/workouts
PUT    /api/workouts/:id
DELETE /api/workouts/:id
```

Body para crear:

```json
{
  "nombre": "Entrenamiento lunes",
  "timestamp": "2026-06-22T12:00:00.000Z",
  "grupoMuscularEtiqueta": "Piernas",
  "series": [
    {
      "exerciseId": 1,
      "repeticiones": 12,
      "peso": 40
    }
  ]
}
```

`Workout` representa un entrenamiento realizado. `WorkoutSet` representa las series reales registradas dentro de ese entrenamiento.

## Modelo de Dominio

### Primera entrega

En la primera entrega se implemento un modelo base para registrar usuarios, ejercicios, grupos musculares, plantillas de entrenamiento y entrenamientos realizados.

El modelo inicial quedo asi:

```txt
User 1 --- N Exercise
User 1 --- N WorkoutTemplate
User 1 --- N MuscleGroup
WorkoutTemplate 1 --- N WorkoutTemplateExercise
Exercise 1 --- N WorkoutTemplateExercise
Exercise N --- N MuscleGroup
User 1 --- N Workout
Workout 1 --- N WorkoutSet
Exercise 1 --- N WorkoutSet
```

La relacion `Exercise N --- N MuscleGroup` se implementa con:

```txt
exercise_muscle_groups
```

En esta primera version, `WorkoutTemplate` funciona como una sesion o plantilla simple de entrenamiento. Por ejemplo, una plantilla "Full body" puede tener sentadilla, flexiones y remo con sus repeticiones planificadas.

### Ampliacion para la entrega final

Para la entrega final se plantea ampliar el modelo para representar mejor la forma en que se planifican entrenamientos en un gimnasio. La idea es separar la planificacion de la ejecucion real del entrenamiento.

El modelo final propuesto agrega estas entidades:

```txt
TrainingProgram
ProgramWeek
ScheduledWorkout
WorkoutTemplate
WorkoutTemplateExercise
Workout
WorkoutSet
```

Conceptualmente:

- `TrainingProgram`: plan completo de entrenamiento, por ejemplo "Hipertrofia 6 semanas".
- `ProgramWeek`: semana dentro del programa, por ejemplo "Semana 4 - descarga".
- `ScheduledWorkout`: entrenamiento programado dentro de una semana, por ejemplo "Dia 1 - Push".
- `WorkoutTemplate`: plantilla de entrenamiento, por ejemplo "Push basico".
- `WorkoutTemplateExercise`: ejercicio planificado dentro de una plantilla.
- `Workout`: entrenamiento real realizado por el usuario.
- `WorkoutSet`: serie real realizada dentro de un entrenamiento.

Relaciones esperadas para la version final:

```txt
User 1 --- N TrainingProgram
TrainingProgram 1 --- N ProgramWeek
ProgramWeek 1 --- N ScheduledWorkout
ScheduledWorkout N --- 1 WorkoutTemplate
WorkoutTemplate 1 --- N WorkoutTemplateExercise
WorkoutTemplateExercise N --- 1 Exercise
User 1 --- N Workout
Workout N --- 1 WorkoutTemplate opcional
Workout N --- 1 ScheduledWorkout opcional
Workout 1 --- N WorkoutSet
WorkoutSet N --- 1 Exercise
```

Con esta ampliacion se cubren varios casos de uso:

- usuarios recreativos que registran entrenamientos libres;
- usuarios que repiten siempre una misma plantilla;
- plantillas de entrenamiento semanales simples;
- programas de varias semanas;
- semanas de descarga;
- semanas de descanso;
- entrenamientos movidos de dia sin romper la planificacion;
- comparacion entre lo planificado y lo realizado.

Ejemplo:

```txt
TrainingProgram: Hipertrofia 6 semanas
ProgramWeek: Semana 1
ScheduledWorkout: Dia 1 - Push
WorkoutTemplate: Push basico
WorkoutTemplateExercise: Press banca 4 series de 8 a 10 reps
Workout: Push realizado el miercoles
WorkoutSet: Press banca serie 1, 8 reps, 60 kg
```

### RPE y RIR

Para la entrega final tambien se puede registrar esfuerzo percibido en las series. No es obligatorio para usar la app: sirve como dato adicional para usuarios que quieran controlar mejor la intensidad.

`RPE` significa `Rate of Perceived Exertion`, es decir, esfuerzo percibido.

`RIR` significa `Reps In Reserve`, es decir, repeticiones en reserva.

Equivalencia aproximada:

```txt
RPE 10 = RIR 0 = no quedaba ninguna repeticion mas
RPE 9  = RIR 1 = quedaba 1 repeticion mas
RPE 8  = RIR 2 = quedaban 2 repeticiones mas
RPE 7  = RIR 3 = quedaban 3 repeticiones mas
```

Ejemplo practico:

```txt
Press banca
4 series
8 a 10 repeticiones
RIR objetivo: 2
```

Eso significa que el usuario debe elegir un peso que le permita hacer entre 8 y 10 repeticiones dejando aproximadamente 2 repeticiones en reserva.

En una plantilla se puede guardar el objetivo, y en el entrenamiento real se puede guardar lo que paso:

```txt
Objetivo: 8-10 reps con RIR 2
Real: 9 reps, 60 kg, RIR 2
```

Esto permite analizar si el entrenamiento fue muy liviano, adecuado o demasiado exigente.

## Deploy en Render

Configuracion recomendada del Web Service en Render:

```txt
Language: Docker
Root Directory: backend
Dockerfile Path: Dockerfile
Docker Context: .
Health Check Path: /api/health
```

PostgreSQL en Render debe crearse como un servicio separado.

Usar la URL interna de la base como `DATABASE_URL` en el servicio backend.

Variables necesarias en Render:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
DB_SSL=true
JWT_SECRET=clave_larga_segura
CORS_ORIGIN=https://url-del-frontend
```

El `Dockerfile` ejecuta:

```bash
npm run start:migrate:seed
```

Por eso, al desplegar en Render, primero corre las migraciones, despues carga los seeders y finalmente inicia la API.

Si la base de Render ya tenia migraciones anteriores, hay que resetearla o recrearla antes de desplegar esta version, porque ahora el esquema inicial esta consolidado en una sola migracion.

## Estado Actual del Desarrollo

Implementado en la primera entrega:

- configuracion Docker del backend
- conexion con PostgreSQL
- configuracion de Sequelize
- autenticacion JWT
- usuarios
- ejercicios
- plantillas de entrenamiento como sesiones simples de entrenamiento
- ejercicios planificados dentro de plantillas
- grupos musculares
- relacion ejercicio-grupo muscular
- entrenamientos realizados
- series reales de entrenamiento

En desarrollo para la entrega final:

- evolucion de plantillas simples hacia programas de entrenamiento;
- programas de entrenamiento de varias semanas;
- semanas de programa;
- entrenamientos programados;
- vinculacion entre planificacion y entrenamientos reales;
- metricas de progreso y visualizaciones en frontend.

## Documentacion Postman

https://documenter.getpostman.com/view/55411762/2sBXwwm7Sq

Pendiente:

- tests de integracion
- integracion con frontend

## Integrantes

- Vladimir Kozik (`alumno1_kozik`)
- Conrado Lanusse (`alumno2_lanusse`)
- Laureano Kronemberger (`alumno3_kronemberger`)
- Santino Aloisio (`alumno4_aloisio`)
- Francisco Jaszczuk (`alumno5_jaszczuk`)
