# PowerUp

Aplicación fullstack para registrar entrenamientos, crear rutinas y organizar planes de varias semanas.

El proyecto fue desarrollado para Programación 3 con React en el frontend y una API REST en Node.js, Express, TypeScript, Sequelize y PostgreSQL.

## Enlaces

Completar estas direcciones después del despliegue:

| Servicio                 | URL                                                                  |
| ------------------------ | -------------------------------------------------------------------- |
| Frontend en Vercel       | `https://front-entrega-final-prog3-grupo5-phi.vercel.app`     |
| API en Render            | `https://backend-entrega-final-prog3-grupo5.onrender.com`            |
| Health de la API         | `https://backend-entrega-final-prog3-grupo5.onrender.com/api/health` |
| Documentación de Postman | https://documenter.getpostman.com/view/55411762/2sBY4Qu1git add README.md12           |

## Funcionalidades

### Usuarios

- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Perfil del usuario autenticado.
- Rutas privadas en el frontend y en la API.

### Ejercicios y grupos musculares

- Catálogo global precargado.
- Ejercicios y grupos musculares personales.
- Relación muchos a muchos entre ejercicios y grupos musculares.
- Búsqueda y filtros por dificultad y grupo muscular.
- Los recursos personales solamente son visibles para su propietario.

### Rutinas

- Creación de plantillas de entrenamiento.
- Incorporación de ejercicios con orden, repeticiones, peso e intensidad objetivo.
- Rutinas globales disponibles para todos los usuarios.
- Rutinas personales editables únicamente por su creador.

En el modelo, una rutina se llama `WorkoutTemplate`: representa una sesión reutilizable, por ejemplo, "Piernas y glúteos".

### Planes de entrenamiento

- Programas de varias semanas.
- Semanas normales o de descarga.
- Sesiones programadas por día o fecha.
- Asociación de cada sesión con una rutina.
- Plan global precargado de cuatro semanas.
- Planes personales con alta, modificación y eliminación desde el frontend.

### Actividad

- Registro de entrenamientos libres.
- Inicio de un entrenamiento desde una rutina.
- Ejecución de una sesión perteneciente a un plan.
- Registro retroactivo mediante fecha y hora.
- Series con ejercicio, repeticiones y peso.
- RPE y RIR opcionales por serie.
- Historial de actividad reciente.

### Dashboard y progreso

- Resumen semanal de entrenamientos, series, repeticiones y volumen.
- Actividad distribuida por día.
- Filtros por período, grupo muscular y ejercicio.
- Volumen de entrenamiento por día.
- Evolución del peso máximo por ejercicio.
- Estimación de una repetición máxima, o 1RM.
- RPE promedio de las series que incluyeron ese dato.

El volumen se calcula como:

```txt
repeticiones * peso
```

El 1RM estimado utiliza la fórmula de Epley:

```txt
peso * (1 + repeticiones / 30)
```

Estas métricas sirven para observar tendencias. No reemplazan una evaluación profesional ni significan por sí solas que el rendimiento mejoró.

## Flujo principal

```txt
Usuario
  └── crea o elige una rutina
        └── la agrega a una sesión programada
              └── la sesión pertenece a una semana
                    └── la semana pertenece a un plan

Usuario
  └── realiza una sesión planificada o libre
        └── registra series reales
              └── peso, repeticiones, RPE y RIR alimentan las métricas
```

## Modelo de dominio

```txt
User 1 ─── N Exercise
User 1 ─── N MuscleGroup
User 1 ─── N WorkoutTemplate
User 1 ─── N TrainingProgram
User 1 ─── N Workout

Exercise N ─── N MuscleGroup
WorkoutTemplate 1 ─── N WorkoutTemplateExercise
WorkoutTemplateExercise N ─── 1 Exercise

TrainingProgram 1 ─── N ProgramWeek
ProgramWeek 1 ─── N ScheduledWorkout
ScheduledWorkout N ─── 1 WorkoutTemplate

Workout N ─── 1 WorkoutTemplate        opcional
Workout N ─── 1 ScheduledWorkout       opcional
Workout 1 ─── N WorkoutSet
WorkoutSet N ─── 1 Exercise
```

### Entidades principales

| Entidad                   | Responsabilidad                                 |
| ------------------------- | ----------------------------------------------- |
| `User`                    | Cuenta y propietario de los recursos personales |
| `Exercise`                | Ejercicio global o personal                     |
| `MuscleGroup`             | Grupo muscular global o personal                |
| `ExerciseMuscleGroup`     | Relación entre ejercicios y grupos musculares   |
| `WorkoutTemplate`         | Rutina o sesión reutilizable                    |
| `WorkoutTemplateExercise` | Ejercicio planificado dentro de una rutina      |
| `TrainingProgram`         | Plan completo de varias semanas                 |
| `ProgramWeek`             | Semana de un plan                               |
| `ScheduledWorkout`        | Rutina programada dentro de una semana          |
| `Workout`                 | Entrenamiento realmente realizado               |
| `WorkoutSet`              | Serie realizada dentro de un entrenamiento      |

### Recursos globales y personales

```txt
userId = null              recurso global
userId = usuario logueado  recurso personal
```

Un usuario puede leer recursos globales y propios. Solamente puede modificar o eliminar los recursos personales que le pertenecen.

## Arquitectura

El backend separa responsabilidades en las siguientes capas:

```txt
route
  -> middleware y validators
  -> controller
  -> service
  -> repository
  -> Sequelize
  -> PostgreSQL
```

- `routes`: define método, URL, autenticación y validadores.
- `controllers`: recibe `req`, llama al servicio y construye la respuesta HTTP.
- `services`: contiene reglas de negocio, propiedad y validaciones entre entidades.
- `repositories`: realiza las consultas mediante Sequelize.
- `models`: representa tablas y asociaciones.
- `middlewares`: autenticación, validación y manejo centralizado de errores.

El frontend organiza el acceso a la API de esta manera:

```txt
page
  -> component
  -> hook
  -> service
  -> API REST
```

## Tecnologías

### Backend

- Node.js 20
- Express
- TypeScript
- Sequelize
- PostgreSQL
- JWT y bcrypt
- express-validator
- Jest y Supertest
- Docker

### Frontend

- React
- Vite
- React Router
- Chart.js
- Lucide React
- CSS

### Infraestructura

- Docker Compose para desarrollo local
- Render para API y PostgreSQL
- Vercel para el frontend
- pgAdmin para administrar PostgreSQL

## Estructura del repositorio

```txt
.
├── backend/
│   ├── config/
│   ├── migrations/
│   ├── seeders/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── validators/
│   ├── tests/
│   ├── Dockerfile
│   └── Dockerfile.dev
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   └── vercel.json
├── docker-compose.yml
└── README.md
```

## Ejecución local con Docker

### Requisitos

- Docker y Docker Compose
- Node.js 20 o superior para ejecutar el frontend

### 1. Levantar PostgreSQL, backend y pgAdmin

Desde la raíz:

```bash
docker compose up -d --build
```

### 2. Aplicar migración y seeders

```bash
docker compose exec backend npm run migrate
docker compose exec backend npm run seed
```

### 3. Levantar el frontend

```bash
cd frontend
npm ci
npm run dev
```

Servicios locales:

| Servicio | Dirección                        |
| -------- | -------------------------------- |
| Frontend | http://localhost:5173            |
| API      | http://localhost:3001/api        |
| Health   | http://localhost:3001/api/health |
| pgAdmin  | http://localhost:5050            |

Credenciales locales de pgAdmin:

```txt
Email: admin@admin.com
Password: admin
```

Conexión desde pgAdmin al PostgreSQL de Docker:

```txt
Host: database
Port: 5432
Database: app_database
User: app_user
Password: app_password
```

### Reiniciar la base local

El siguiente comando elimina todos los datos locales:

```bash
docker compose down -v
docker compose up -d --build
docker compose exec backend npm run migrate
docker compose exec backend npm run seed
```

## Variables de entorno

### Backend local

Archivo `backend/.env`:

```env
NODE_ENV=development
PORT=3001

DB_HOST=localhost
DB_PORT=5432
DB_NAME=app_database
DB_USER=app_user
DB_PASSWORD=app_password

JWT_SECRET=cambiar_por_una_clave_larga
CORS_ORIGIN=http://localhost:5173
```

Cuando el backend se ejecuta dentro de Docker Compose, `DB_HOST` debe ser `database`.

### Frontend local

Archivo `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

### Producción

Backend en Render:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
DB_SSL=true
JWT_SECRET=clave_larga_generada
CORS_ORIGIN=https://url-del-frontend.vercel.app
```

Frontend en Vercel:

```env
VITE_API_URL=https://backend-entrega-final-prog3-grupo5.onrender.com/api
```

No se deben subir archivos `.env`, contraseñas reales, `DATABASE_URL` ni `JWT_SECRET` al repositorio.

## Scripts

### Backend

Ejecutar desde `backend/`:

| Comando                      | Función                              |
| ---------------------------- | ------------------------------------ |
| `npm run dev`                | API en desarrollo                    |
| `npm run build`              | Compila TypeScript en `dist/`        |
| `npm start`                  | Ejecuta el código compilado          |
| `npm run migrate`            | Aplica migraciones                   |
| `npm run seed`               | Carga datos globales                 |
| `npm test`                   | Compila y ejecuta Jest               |
| `npm run start:migrate`      | Migra e inicia la API                |
| `npm run start:migrate:seed` | Migra, carga seeders e inicia la API |

### Frontend

Ejecutar desde `frontend/`:

| Comando           | Función                       |
| ----------------- | ----------------------------- |
| `npm run dev`     | Inicia Vite                   |
| `npm run build`   | Genera el build de producción |
| `npm run lint`    | Ejecuta ESLint                |
| `npm run format`  | Formatea con Prettier         |
| `npm run preview` | Previsualiza el build         |

## Base de datos y seeders

El esquema se encuentra consolidado en:

```txt
backend/migrations/20260622000000-create-training-schema.js
```

La migración crea:

- `users`
- `exercises`
- `muscle_groups`
- `exercise_muscle_groups`
- `workout_templates`
- `workout_template_exercises`
- `training_programs`
- `program_weeks`
- `scheduled_workouts`
- `workouts`
- `workout_sets`

Los seeders globales cargan:

- 10 grupos musculares.
- 12 ejercicios y sus grupos musculares.
- 3 rutinas con 4 ejercicios cada una.
- Objetivos RPE/RIR para los ejercicios planificados.
- 1 plan global de 4 semanas.
- 3 sesiones programadas por semana.
- 1 cuenta demo con 12 entrenamientos y 144 series.

Los catálogos, rutinas y planes globales son visibles para todos. Los entrenamientos de demostración pertenecen únicamente a la cuenta demo.

### Cuenta de demostración

```txt
Email: demo@powerup.com
Password: Demo1234!
```

El seeder `20260726000000-seed-demo-user-activity.js` genera datos sintéticos para que puedan observarse todas las métricas:

- 4 semanas de actividad;
- 3 sesiones planificadas por semana;
- progresión de carga durante las primeras 3 semanas;
- una semana final de descarga;
- registros repetidos de sentadilla y press de banca;
- RPE y RIR en todas las series.

Las fechas se calculan a partir de la semana actual cada vez que se ejecutan los seeders. Los entrenamientos demo anteriores se reemplazan dentro de una transacción, por lo que ejecutar `npm run seed` nuevamente no duplica la información.

Una cuenta registrada normalmente comienza sin entrenamientos realizados. Su Dashboard y sus gráficos se completan a medida que registra actividad.

## RPE y RIR

RPE representa el esfuerzo percibido de 1 a 10. RIR representa cuántas repeticiones más se podrían haber realizado.

Relación aproximada:

```txt
RPE 10 = RIR 0
RPE 9  = RIR 1
RPE 8  = RIR 2
RPE 7  = RIR 3
```

Ambos campos son opcionales. Una persona puede usar la aplicación registrando solamente ejercicio, repeticiones y peso.

## Rutas del frontend

| Ruta          | Vista                                  |
| ------------- | -------------------------------------- |
| `/acceso`     | Registro e inicio de sesión            |
| `/`           | Dashboard semanal                      |
| `/actividad`  | Registro e historial de entrenamientos |
| `/ejercicios` | Ejercicios y grupos musculares         |
| `/rutinas`    | Plantillas de entrenamiento            |
| `/planes`     | Programas, semanas y sesiones          |
| `/progreso`   | Gráficos y métricas                    |
| `/cuenta`     | Perfil                                 |

Excepto `/acceso`, las vistas requieren autenticación.

## Endpoints principales

La base local es:

```txt
http://localhost:3001/api
```

Las rutas privadas requieren:

```http
Authorization: Bearer TOKEN
```

| Recurso            | Endpoints                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| Health             | `GET /health`                                                                                     |
| Auth               | `POST /auth/register`, `POST /auth/login`, `GET /auth/perfil`                                     |
| Exercises          | `GET`, `POST /exercises`; `GET`, `PUT`, `DELETE /exercises/:id`                                   |
| Muscle groups      | `GET`, `POST /muscle-groups`; `GET`, `PUT`, `DELETE /muscle-groups/:id`                           |
| Workout templates  | `GET`, `POST /workout-templates`; `GET`, `PUT`, `DELETE /workout-templates/:id`                   |
| Template exercises | `GET`, `POST /workout-template-exercises`; `GET`, `PUT`, `DELETE /workout-template-exercises/:id` |
| Training programs  | `GET`, `POST /training-programs`; `GET`, `PUT`, `DELETE /training-programs/:id`                   |
| Program weeks      | `GET`, `POST /program-weeks`; `GET`, `PUT`, `DELETE /program-weeks/:id`                           |
| Scheduled workouts | `GET`, `POST /scheduled-workouts`; `GET`, `PUT`, `DELETE /scheduled-workouts/:id`                 |
| Workouts           | `GET`, `POST /workouts`; `GET`, `PUT`, `DELETE /workouts/:id`                                     |
| Metrics            | `GET /metrics/summary`, `GET /metrics/activity-heatmap`, `GET /metrics/exercise-progress`         |

Filtros requeridos:

```http
GET /exercises?muscleGroupId=1
GET /program-weeks?trainingProgramId=1
GET /scheduled-workouts?programWeekId=1
GET /workout-template-exercises?workoutTemplateId=1
GET /metrics/exercise-progress?exerciseId=1
```

Las métricas aceptan `from` y `to` como filtros opcionales.

### Registro de un entrenamiento

```json
{
  "nombre": "Piernas realizado",
  "timestamp": "2026-07-20T18:30:00.000Z",
  "workoutTemplateId": 3,
  "scheduledWorkoutId": 3,
  "series": [
    {
      "exerciseId": 3,
      "repeticiones": 10,
      "peso": 60,
      "rir": 2,
      "rpe": 8
    }
  ]
}
```

`workoutTemplateId` y `scheduledWorkoutId` son opcionales. Si ambos se omiten, se registra un entrenamiento libre.

## Tests

```bash
cd backend
npm test
```

La suite actual usa Jest y Supertest. Comprueba health, rutas inexistentes, autenticación y validaciones antes de acceder a PostgreSQL.

También se recomienda verificar antes de integrar cambios:

```bash
cd backend
npm run build
npm test

cd ../frontend
npm run lint
npm run build
```

Los tests actuales no reemplazan una suite completa de integración contra una base PostgreSQL de prueba.

## Despliegue

### PostgreSQL en Render

1. Crear un servicio PostgreSQL.
2. Usar la misma región que la API.
3. Copiar la Internal Database URL.
4. Configurarla como `DATABASE_URL` en el Web Service.

La migración consolidada está pensada para una base nueva. Si se reutiliza una base con migraciones anteriores, primero hay que revisar o recrear su estado.

### API en Render

Configuración:

```txt
Language: Docker
Root Directory: backend
Dockerfile Path: Dockerfile
Docker Context: .
Health Check Path: /api/health
```

El Dockerfile ejecuta:

```bash
npm run start:migrate:seed
```

Por lo tanto, cada despliegue aplica migraciones pendientes, ejecuta los seeders idempotentes e inicia la API.

### Frontend en Vercel

Importar el mismo repositorio y configurar:

```txt
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Agregar:

```env
VITE_API_URL=https://backend-entrega-final-prog3-grupo5.onrender.com
```

`frontend/vercel.json` redirige las rutas de React hacia `index.html`, por lo que una recarga en `/planes` o `/progreso` no devuelve 404.

Finalmente:

1. Copiar la URL de Vercel.
2. Colocarla como `CORS_ORIGIN` en Render.
3. Volver a desplegar la API.
4. Probar registro, login y una ruta protegida desde el frontend publicado.

## Posibles mejoras

- Heatmap visual estilo GitHub usando `intensityLevel`.
- Porcentaje de cumplimiento entre sesiones programadas y realizadas.
- Tests de integración con PostgreSQL.
- Recuperación de contraseña.
- Paginación para historiales extensos.

## Integrantes

- Vladimir Kozik (`alumno1_kozik`)
- Conrado Lanusse (`alumno2_lanusse`)
- Laureano Kronemberger (`alumno3_kronemberger`)
- Santino Aloisio (`alumno4_aloisio`)
- Francisco Jaszczuk (`alumno5_jaszczuk`)
