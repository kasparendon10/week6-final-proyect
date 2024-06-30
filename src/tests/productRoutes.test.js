const request = require('supertest');
const app = require('../app');
const { Product, Category } = require('../models'); // Asegúrate de importar todos los modelos necesarios

describe('Rutas de Productos', () => {
    beforeAll(async () => {
        await Category.sync({ force: true }); // Sincronizar primero las categorías
        await Product.sync({ force: true }); // Luego sincronizar los productos
    });

    test('debería crear un producto', async () => {
        // Primero creamos una categoría para poder asociarla con el producto
        const category = await Category.create({ name: 'Categoría de Prueba' });

        const response = await request(app)
            .post('/api/v1/products')
            .send({ title: 'Producto de Prueba', price: 9.99, categoryId: category.id })
            .expect(201);
        
        expect(response.body.title).toBe('Producto de Prueba');
        expect(response.body.price).toBe(9.99);
    });

    test('debería retornar error de validación para producto inválido', async () => {
        await request(app)
            .post('/api/v1/products')
            .send({ title: '', price: -1, categoryId: 1 })
            .expect(400);
    });

    // Añadir más pruebas según sea necesario
});

