const request = require('supertest');
const app = require('../app');
const { Product, Category, User } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

describe('Rutas de Productos', () => {
    let token;

    beforeAll(async () => {
        await Category.sync({ force: true });
        await Product.sync({ force: true });
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

    test('debería crear un producto', async () => {
        const category = await Category.create({ name: 'Categoría de Prueba' });

        const response = await request(app)
            .post('/api/v1/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Producto de Prueba', price: 9.99, categoryId: category.id })
            .expect(201);
        
        expect(response.body.title).toBe('Producto de Prueba');
        expect(response.body.price).toBe(10);
    });

    test('debería retornar error de validación para producto inválido', async () => {
        await request(app)
            .post('/api/v1/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: '', price: -1, categoryId: 1 })
            .expect(400);
    });

    test('debería obtener un producto por su ID', async () => {
        const category = await Category.create({ name: 'Categoría de Prueba' });
        const product = await Product.create({ title: 'Producto de Prueba', price: 10, categoryId: category.id });

        const response = await request(app)
            .get(`/api/v1/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.title).toBe('Producto de Prueba');
        expect(response.body.price).toBe(10);
    });

    test('debería actualizar un producto existente', async () => {
        const category = await Category.create({ name: 'Categoría de Prueba' });
        const product = await Product.create({ title: 'Producto a Actualizar', price: 20, categoryId: category.id });
        const updatedProductData = { title: 'Producto Actualizado', price: 30 };

        const response = await request(app)
            .put(`/api/v1/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedProductData)
            .expect(200);

        expect(response.body.title).toBe('Producto Actualizado');
        expect(response.body.price).toBe(30);
    });

    test('debería eliminar un producto existente', async () => {
        const category = await Category.create({ name: 'Categoría de Prueba' });
        const product = await Product.create({ title: 'Producto a Eliminar', price: 10, categoryId: category.id });

        await request(app)
            .delete(`/api/v1/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        // Verifica que el producto se eliminó
        const deletedProduct = await Product.findByPk(product.id);
        expect(deletedProduct).toBeNull();
    });
});
