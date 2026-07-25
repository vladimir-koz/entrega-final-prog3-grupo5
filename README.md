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
- `routines`
- `routine_sets`
- `muscle_groups`
- `exercise_muscle_groups`
- `workouts`
- `workout_sets`

Los datos iniciales se cargan con seeders:

```txt
backend/seeders/20260622010000-seed-muscle-groups.js
backend/seeders/20260622020000-seed-exercises.js
backend/seeders/20260622030000-seed-routines.js
```

Datos precargados:

- 10 grupos musculares globales
- 12 ejercicios globales
- relaciones entre ejercicios y grupos musculares
- 3 rutinas globales
- 12 series planificadas de rutina

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
- rutinas
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

### Routines

```http
GET    /api/routines
GET    /api/routines/:id
POST   /api/routines
PUT    /api/routines/:id
DELETE /api/routines/:id
```

Body para crear:

```json
{
  "nombre": "Fuerza tren inferior",
  "descripcion": "Rutina enfocada en fuerza para tren inferior",
  "tipo": "Fuerza",
  "grupoMuscularEtiqueta": "Piernas",
  "dificultad": "intermedio",
  "tiempoEstimado": 60
}
```

### Routine Sets

```http
GET    /api/routine-sets?routineId=1
GET    /api/routine-sets/:id
POST   /api/routine-sets
PUT    /api/routine-sets/:id
DELETE /api/routine-sets/:id
```

Body para crear:

```json
{
  "routineId": 1,
  "exerciseId": 2,
  "orden": 1,
  "repeticiones": 10,
  "peso": 80
}
```

`RoutineSet` representa el trabajo planificado dentro de una rutina.

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

Modelo implementado actualmente:

```txt
User 1 --- N Exercise
User 1 --- N Routine
User 1 --- N MuscleGroup
Routine 1 --- N RoutineSet
Exercise 1 --- N RoutineSet
Exercise N --- N MuscleGroup
User 1 --- N Workout
Workout 1 --- N WorkoutSet
Exercise 1 --- N WorkoutSet
```

La relacion `Exercise N --- N MuscleGroup` se implementa con:

```txt
exercise_muscle_groups
```

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

Implementado:

- configuracion Docker del backend
- conexion con PostgreSQL
- configuracion de Sequelize
- autenticacion JWT
- usuarios
- ejercicios
- rutinas
- series planificadas de rutina
- grupos musculares
- relacion ejercicio-grupo muscular
- entrenamientos
- series reales de entrenamiento

##Documentacion postman: 
https://documenter.getpostman.com/view/55411762/2sBXwwm7Sq

Pendiente:

- tests de integracion
- coleccion de Postman
- integracion con frontend


Este módulo permite realizar las operaciones básicas de un CRUD: listar, obtener por id, crear, editar y eliminar ejercicios.
Permite obtener ejercicios precargados y ejercicios creados por el usuario. Para esto discrimina aquellos que no tengan id de usuario.

Para esto se incorporó:

Modelo Sequelize Exercise.
Migración para crear la tabla exercises.
Service con la lógica principal del CRUD.
Controller para manejar las respuestas HTTP.
Rutas REST bajo /api/exercises.
Tipos TypeScript para los requests.
Registro del modelo en Sequelize.
Registro de las rutas en el router principal.
Asociacion de ejercicios al usuario autenticado mediante userId.
Endpoints disponibles
GET /api/exercises
GET /api/exercises/:id
POST /api/exercises
PUT /api/exercises/:id
DELETE /api/exercises/:id
Ejemplo de body para crear un ejercicio
{
  "nombre": "Sentadilla",
  "descripcion": "Ejercicio basico de piernas",
  "dificultad": "intermedio",
  "imagen": "sentadilla.jpg"
}
Módulo de rutinas

También se agregó el módulo de rutinas, pensado para que cada usuario pueda crear y administrar sus propias rutinas de entrenamiento.

A diferencia del módulo de ejercicios, estas rutas están protegidas y requieren autenticación mediante token JWT. Esto permite asociar cada rutina al usuario correspondiente.

Para este módulo se incorporó:

Modelo Sequelize Routine.
Migración para crear la tabla routines.
Relación User hasMany Routine.
Relación Routine belongsTo User.
Service con la lógica principal del CRUD.
Controller para manejar las respuestas HTTP.
Rutas REST protegidas bajo /api/routines.
Tipos TypeScript para los requests.
Registro del modelo en Sequelize.
Registro de las rutas en el router principal.
Endpoints disponibles
GET /api/routines
GET /api/routines/:id
POST /api/routines
PUT /api/routines/:id
DELETE /api/routines/:id
Autenticación requerida

Para utilizar estas rutas es necesario enviar el token JWT en el header de la request:

Authorization: Bearer TOKEN
Ejemplo de body para crear una rutina
{
  "nombre": "Rutina fuerza",
  "descripcion": "Rutina de tren inferior",
  "tipo": "Fuerza",
  "grupoMuscularEtiqueta": "Piernas",
  "dificultad": "intermedio",
  "tiempoEstimado": 60
}
Verificación

Se verificó que el backend compile correctamente y que las migraciones se ejecuten dentro del entorno Docker.

Comandos utilizados:

docker compose exec backend npm run build
docker compose exec backend npm run migrate

Además, se probaron los endpoints principales utilizando Invoke-RestMethod para comprobar que las rutas respondan correctamente y que el flujo básico de creación, consulta, edición y eliminación funcione como se esperaba


## Integrantes

- Vladimir Kozik (`alumno1_kozik`)
- Conrado Lanusse (`alumno2_lanusse`)
- Laureano Kronemberger (`alumno3_kronemberger`)
- Santino Aloisio (`alumno4_aloisio`)
- Francisco Jaszczuk (`alumno5_jaszczuk`)
