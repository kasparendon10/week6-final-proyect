const request = require('supertest');
const app = require('../app');
const { Product, Category, User, Cart, Purchase } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

describe('Rutas de Compras', () => {
    let token;

    beforeAll(async () => {
        await Category.sync({ force: true });
        await Product.sync({ force: true });
        await User.sync({ force: true });
        await Cart.sync({ force: true });
        await Purchase.sync({ force: true });

        // Crear un usuario de prueba
        const user = await User.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@gmail.com',
            password: 'testpassword',
        });

        // Generar un token de autenticación
        token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Crear una categoría de prueba
        const category = await Category.create({ name: 'Categoría de Prueba' });

        // Crear un producto de prueba
        const product = await Product.create({
            title: 'Producto de Prueba',
            price: 100,
            categoryId: category.id
        });

        // Añadir un producto al carrito
        await Cart.create({
            userId: user.id,
            productId: product.id,
            quantity: 2
        });
    });

    test('crear una nueva compra', async () => {
        const response = await request(app)
            .post('/api/v1/purchase')
            .set('Authorization', `Bearer ${token}`)
            .expect(201);

        expect(response.body.length).toBeGreaterThan(0);
    });

    test('obtener todas las compras del usuario', async () => {
        const response = await request(app)
            .get('/api/v1/purchase')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });
});
