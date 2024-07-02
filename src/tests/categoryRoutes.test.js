const request = require('supertest');
const app = require('../app');
const { Category, User } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

describe('Rutas de Categorías', () => {
    let token;

    beforeAll(async () => {
        await Category.sync({ force: true });
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

    test('debería crear una nueva categoría', async () => {
        const response = await request(app)
            .post('/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Electronics' })
            .expect(201);

        expect(response.body.name).toBe('Electronics');
    });

    test('debería obtener todas las categorías', async () => {
        const response = await request(app)
            .get('/categories')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    test('debería eliminar una categoría', async () => {
        await request(app)
            .delete('/categories/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const category = await Category.findByPk(1);
        expect(category).toBeNull();
    });
});

