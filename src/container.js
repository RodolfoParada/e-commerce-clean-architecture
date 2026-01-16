const PlaceOrder = require('./domain/usecases/PlaceOrder');
const JsonRepository = require('./infrastructure/adapters/JsonRepository');
const OrderApplicationService = require('./application/services/OrderApplicationService');
const OrderController = require('./infrastructure/controllers/OrderController');

// Adaptador de pago simulado
const mockPaymentService = {
  process: async (amount) => ({ success: true })
};

function setup() {
  // Capa 1: Infraestructura (Repositorio)
  const repo = new JsonRepository(); 
  
  // Capa 2: Dominio (Caso de Uso)
  const placeOrderUseCase = new PlaceOrder(repo, mockPaymentService);
  
  // Capa 3: Aplicación (Servicio que coordina)
  const orderAppService = new OrderApplicationService(placeOrderUseCase);
  
  // Capa 4: Infraestructura (Controlador)
  const controller = new OrderController(orderAppService);

  return { controller };
}

module.exports = setup;