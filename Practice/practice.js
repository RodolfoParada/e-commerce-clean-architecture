Practical exercise to apply the concepts learned.
Aplicación completa de e-commerce con Clean Architecture:

// 📁 domain/entities/Product.js
class Product {
  constructor(id, name, price, category) {
    this.validatePrice(price);
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  validatePrice(price) {
    if (price <= 0) throw new Error('Precio debe ser positivo');
  }

  applyDiscount(percentage) {
    this.price = this.price * (1 - percentage / 100);
  }
}

// 📁 domain/usecases/PlaceOrder.js
class PlaceOrder {
  constructor(
    orderRepository,
    productRepository,
    paymentService,
    idGenerator
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.paymentService = paymentService;
    this.idGenerator = idGenerator;
  }

  async execute(orderData) {
    // Validar productos
    const products = await this.validateProducts(orderData.items);

    // Calcular total
    const total = products.reduce((sum, product) => sum + product.price, 0);

    // Procesar pago
    const paymentResult = await this.paymentService.processPayment(
      total,
      orderData.paymentMethod
    );

    // Crear orden
    const order = new Order(
      this.idGenerator.generate(),
      orderData.customerId,
      products,
      total,
      paymentResult.transactionId
    );

    // Guardar orden
    await this.orderRepository.save(order);

    return order;
  }

  async validateProducts(items) {
    const products = [];
    for (const item of items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) throw new Error(`Producto no encontrado: ${item.productId}`);
      products.push(product);
    }
    return products;
  }
}

// 📁 infrastructure/web/routes/OrderRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (orderController) => {
  router.post('/', orderController.placeOrder.bind(orderController));
  router.get('/:id', orderController.getOrder.bind(orderController));

  return router;
};
Requerimientos:
// 📁 container.js - Inyección de dependencias
const { MongoClient } = require('mongodb');
const { UserController } = require('./infrastructure/controllers/UserController');
const { UserApplicationService } = require('./application/services/UserApplicationService');
const { CreateUser } = require('./domain/usecases/CreateUser');
const { InMemoryUserRepository } = require('./infrastructure/adapters/InMemoryUserRepository');

async function createContainer() {
  // Infrastructure
  const mongoClient = await MongoClient.connect(process.env.MONGO_URL);
  const userRepository = new InMemoryUserRepository(); // O MongoUserRepository(mongoClient)
  const idGenerator = new UUIDGenerator();

  // Domain
  const createUserUseCase = new CreateUser(userRepository, idGenerator);

  // Application
  const userAppService = new UserApplicationService(createUserUseCase);

  // Infrastructure (Controllers)
  const userController = new UserController(userAppService);

  return {
    userController,
    // ... otros servicios
  };
}

module.exports = { createContainer };