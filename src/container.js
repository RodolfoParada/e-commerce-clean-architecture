const PlaceOrder = require('./domain/usecases/PlaceOrder');
// 1. Cambiamos la importación
const JsonRepository = require('./infrastructure/adapters/JsonRepository'); 
const OrderController = require('./infrastructure/controllers/OrderController');

const mockPaymentService = {
  process: async (amount) => ({ success: true })
};

function setup() {
  // 2. Instanciamos el nuevo repositorio en lugar del InMemory
  const repo = new JsonRepository(); 
  
  // 3. ¡IMPORTANTE! El caso de uso no cambia, sigue recibiendo un "repo"
  const useCase = new PlaceOrder(repo, mockPaymentService);
  const controller = new OrderController(useCase);

  return { controller };
}

module.exports = setup;