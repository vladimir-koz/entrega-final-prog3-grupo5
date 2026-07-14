const request = require('supertest');
const app = require('../dist/app').default;

describe('API base', () => {
  test('GET /health responde ok', async () => {
    const response = await request(app).get('/health').expect(200);

    expect(response.body.status).toBe('ok');
    expect(response.body.message).toBe('Backend funcionando');
  });

  test('GET /api/health responde ok', async () => {
    const response = await request(app).get('/api/health').expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('API funcionando correctamente');
  });

  test('ruta inexistente devuelve 404', async () => {
    const response = await request(app).get('/api/no-existe').expect(404);

    expect(response.body.error).toBe('Ruta no encontrada');
    expect(response.body.path).toBe('/api/no-existe');
  });

  test('ruta protegida sin token devuelve 401', async () => {
    const response = await request(app).get('/api/workouts').expect(401);

    expect(response.body.error).toBe('Token no proporcionado');
  });

  test('register invalido devuelve errores de validacion', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: '',
        email: 'email-invalido',
        password: '123'
      })
      .expect(400);

    expect(response.body.error).toBe('Datos invalidos');
    expect(Array.isArray(response.body.details)).toBe(true);
    expect(response.body.details.length).toBeGreaterThan(0);
  });

  test('login invalido devuelve errores de validacion', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'email-invalido',
        password: ''
      })
      .expect(400);

    expect(response.body.error).toBe('Datos invalidos');
    expect(Array.isArray(response.body.details)).toBe(true);
    expect(response.body.details.length).toBeGreaterThan(0);
  });
});
