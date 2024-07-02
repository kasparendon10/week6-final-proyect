const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

describe('Rutas de Usuarios', () => {
    let token;

    beforeAll(async () => {
        await User.sync({ force: true });

        // Crear un usuario de prueba
        const user = await User.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@gmail.com',
            password: 'testpassword',
        });

        // Generar un token de autenticación
        token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    test('registrar un nuevo usuario', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send({
                firstName: 'Juan',
                lastName: 'Perez',
                email: 'juan@gmail.com',
                password: 'password123',
                phone: '1234567890'
            })
            .expect(201);

        expect(response.body.email).toBe('juan@gmail.com');
    });

    test('iniciar sesión un usuario', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'testuser@gmail.com',
                password: 'testpassword'
            })
            .expect(200);

        expect(response.body).toHaveProperty('token');
    });

    test('obtener todos los usuarios', async () => {
        const response = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    test('actualizar un usuario', async () => {
        const response = await request(app)
            .put('/api/v1/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'Updated',
                lastName: 'User',
                email: 'updateduser@gmail.com',
                phone: '9876543210'
            })
            .expect(200);

        expect(response.body.email).toBe('updateduser@gmail.com');
    });

    test('eliminar un usuario', async () => {
        await request(app)
            .delete('/api/v1/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const user = await User.findByPk(1);
        expect(user).toBeNull();
    });
});
