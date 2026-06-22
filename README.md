# segundo-parcial-prog3-grupo5
Monorepo para la aplicacion fullstack para el segundo parcial de programación 3 

# Segundo Parcial Programacion 3 - Grupo 5

Aplicacion fullstack para gestion de entrenamientos, rutinas, ejercicios y grupos musculares.

## Estructura

- `backend/`: API REST con Node.js, Express, Sequelize, PostgreSQL y Docker.
- `frontend/`: aplicacion React. Pendiente de desarrollo.

## Backend

El backend expone endpoints para autenticacion, usuarios y posteriormente el dominio de entrenamientos.


## Estructura principal

```txt
backend/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── database.ts
│   ├── models/
│   │   ├── index.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── index.ts
│   │   └── auth.routes.ts
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── types/
│   │   ├── auth.types.ts
│   │   └── express.d.ts
│   └── utils/
│       └── AppError.ts
├── migrations/
├── config/
│   └── config.js
├── Dockerfile
├── Dockerfile.dev
├── package.json
└── tsconfig.json

## Variables de entorno

Crear un archivo `.env` dentro de `backend/` para desarrollo local:

```env
NODE_ENV=development
PORT=3001

DB_HOST=localhost
DB_PORT=5432
DB_NAME=app_database
DB_USER=app_user
DB_PASSWORD=app_password

JWT_SECRET=clave_larga_para_firmar_tokens
CORS_ORIGIN=http://localhost:3000
```

En produccion, por ejemplo Render, se usa:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
DB_SSL=true
JWT_SECRET=clave_larga_real_generada
CORS_ORIGIN=https://url-del-frontend
```

`DATABASE_URL` reemplaza a `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`.

## Scripts disponibles

Desde la carpeta `backend/`:

```bash
npm run dev
```

Levanta el servidor en modo desarrollo con TypeScript.

```bash
npm run build
```

Compila TypeScript a JavaScript dentro de `dist/`.

```bash
npm start
```

Ejecuta la version compilada desde `dist/server.js`.

```bash
npm run migrate
```

Ejecuta las migraciones de Sequelize.

## Base de datos

El backend usa Sequelize como ORM para conectarse a PostgreSQL.

Archivos importantes:

- `src/config/database.ts`: configuracion usada por el backend TypeScript.
- `config/config.js`: configuracion usada por `sequelize-cli` para migraciones.
- `src/models/index.ts`: inicializa Sequelize y registra los modelos.
- `migrations/`: contiene los cambios estructurales de la base.

Actualmente existe la tabla:

```txt
users
```

Campos principales:

```txt
id
nombre
email
password
createdAt
updatedAt
```

La contrasena se guarda hasheada, no en texto plano.

## Endpoints actuales

Base URL local:

```txt
http://localhost:3001
```

Base URL produccion:

```txt
https://nombre-del-servicio.onrender.com
```

### Health

```http
GET /health
GET /api/health
```

Sirven para verificar que el servidor esta funcionando.

### Auth

```http
POST /api/auth/register
```

Body:

```json
{
  "nombre": "Vladimir",
  "email": "vladimir@test.com",
  "password": "vlad123"
}
```

Respuesta esperada:

```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "nombre": "Vladimir",
    "email": "vladimir@test.com"
  },
  "token": "jwt..."
}
```

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "vladimir@test.com",
  "password": "vlad123"
}
```

```http
GET /api/auth/perfil
```

Requiere header:

```txt
Authorization: Bearer TOKEN
```

## Deploy en Render

El proyecto se despliega como Web Service usando Docker.

Configuracion recomendada:

```txt
Language: Docker
Root Directory: backend
Dockerfile Path: Dockerfile
Docker Context: .
Health Check Path: /api/health
```

La base PostgreSQL se crea como un servicio separado en Render.
Luego se copia la `Internal Database URL` y se carga como variable `DATABASE_URL` en el backend.

## Estado del desarrollo

Este backend deja lista la base inicial para que el equipo continue trabajando sobre:

- Modelos del dominio de entrenamiento.
- Ejercicios.
- Grupos musculares.
- Rutinas.
- Entrenamientos.
- Series.
- Tests de integracion.
- Consumo desde frontend React.


Integrantes y contribuciones

Vladimir Kozik (rama: alumno1_kozik)

Conrado Lanusse (rama: alumno2_lanusse)

Laureano Kronemberger (rama: alumno3_kronemberger)

Santino Aloisio (rama: alumno4_aloisio)

Francisco Jaszczuk (rama: alumno5_jaszczuk)

Cambios realizados

En esta etapa se trabajó sobre el backend del proyecto, incorporando dos módulos principales: ejercicios y rutinas.
La idea fue empezar a estructurar la lógica necesaria para que la aplicación pueda manejar un catálogo de ejercicios y, a la vez, permitir que cada usuario cree y administre sus propias rutinas.

Módulo de ejercicios

Se agregó el módulo de ejercicios para administrar el catálogo de ejercicios disponibles dentro de la aplicación.

Este módulo permite realizar las operaciones básicas de un CRUD: listar, obtener por id, crear, editar y eliminar ejercicios.

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
