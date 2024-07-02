const request = require('supertest');
const app = require('../app');
const sequelize = require('../utils/connection');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/category');
const Cart = require('../models/Cart');

let token;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    const user = await User.create({
        firstName: 'Juan',
        lastName: 'perez',
        email: 'juan.perez@gmail.com',
        password: 'password',
    });

    const category = await Category.create({ name: 'Electronics' });
    const product = await Product.create({
        title: 'Smartphone',
        description: 'A cool smartphone',
        price: 30,
        categoryId: category.id,
    });

    const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'juan.perez@gmail.com', password: 'password' });

    token = response.body.token;
});

afterAll(async () => {
    // Limpiar la base de datos después de todas las pruebas
    await sequelize.close();
});

test('añadir un producto al carrito', async () => {
    const response = await request(app)
        .post('/api/v1/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 1, quantity: 2 })
        .expect(201);

    expect(response.body.productId).toBe(1);
    expect(response.body.quantity).toBe(2);
});

test('añadir un producto al carrito - manejo duplicados', async () => {
    // Verificar si el producto ya esta en el carrito
    const existingCartItem = await Cart.findOne({ where: { productId: 1 } });

    if (existingCartItem) {
        // Si el producto ya esta actualizar la cantidad
        const response = await request(app)
            .put(`/api/v1/cart/${existingCartItem.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ quantity: existingCartItem.quantity + 1 })
            .expect(200);

        expect(response.body.message).toBe('Cart updated');
    } else {
        // Si el producto no esta añadirlo
        const response = await request(app)
            .post('/api/v1/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({ productId: 1, quantity: 2 })
            .expect(201);

        expect(response.body.productId).toBe(1);
        expect(response.body.quantity).toBe(2);
    }
});

test('obtener todos los productos en el carrito del usuario', async () => {
    const response = await request(app)
        .get('/api/v1/cart')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
});

test('obtener un producto del carrito por ID', async () => {
    const response = await request(app)
        .get('/api/v1/cart/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    expect(response.body.productId).toBe(1);
    expect(response.body.quantity).toBe(2);
});

test('actualizar la cantidad de un producto en el carrito', async () => {
    const response = await request(app)
        .put('/api/v1/cart/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: 1, quantity: 3 })
        .expect(200);

    expect(response.body.message).toBe('Cart updated');
});

test('eliminar un producto del carrito', async () => {
    await request(app)
        .delete('/api/v1/cart/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

    const cartItem = await Cart.findByPk(1);
    expect(cartItem).toBeNull();
});
