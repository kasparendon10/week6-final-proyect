const request = require('supertest');
const app = require('../app');
const { Product, ProductImg, Category, User } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

describe('Rutas de ProductImg', () => {
    let token;
    let productId;

    beforeAll(async () => {
        await Category.sync({ force: true });
        await Product.sync({ force: true });
        await ProductImg.sync({ force: true });
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

        // Crear una categoría de prueba
        const category = await Category.create({ name: 'Categoría de Prueba' });

        // Crear un producto de prueba
        const product = await Product.create({
            title: 'Producto de Prueba',
            price: 100,
            categoryId: category.id
        });
        productId = product.id;
    });

    test('crear una nueva imagen de producto', async () => {
        const response = await request(app)
            .post(`/api/v1/products/${productId}/images`)
            .set('Authorization', `Bearer ${token}`)
            .attach('image', 'tests/fixtures/image.jpg')
            .expect(201);

        expect(response.body.message).toBe('Product image uploaded successfully');
        expect(response.body.productImg).toBeDefined();
    });

    test('obtener todas las imágenes de producto', async () => {
        // Crear una imagen de producto para el producto de prueba
        await ProductImg.create({
            url: 'https://example.com/image.jpg',
            filename: 'image.jpg',
            productId: productId
        });

        const response = await request(app)
            .get(`/api/v1/products/${productId}/images`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].productId).toBe(productId);
    });

    test('eliminar una imagen de producto', async () => {
        // Crear una imagen de producto para el producto de prueba
        const productImg = await ProductImg.create({
            url: 'https://example.com/image.jpg',
            filename: 'image.jpg',
            productId: productId
        });

        const response = await request(app)
            .delete(`/api/v1/products/${productId}/images/${productImg.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        // Verificar que la imagen haya sido eliminada
        const deletedProductImg = await ProductImg.findByPk(productImg.id);
        expect(deletedProductImg).toBeNull();
    });
});
