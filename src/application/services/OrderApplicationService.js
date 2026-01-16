class OrderApplicationService {
  constructor(placeOrderUseCase) {
    this.placeOrderUseCase = placeOrderUseCase;
  }

  async createOrder(productId, quantity) {
    // 1. Validaciones de aplicación (ej. cantidad mínima)
    if (quantity <= 0) {
      throw new Error('La cantidad debe ser mayor a cero');
    }

    // 2. Llamada al caso de uso (Dominio)
    const order = await this.placeOrderUseCase.execute(productId, quantity);

    // 3. Lógica extra (Auditoría)
    console.log(`[LOG] Orden procesada exitosamente para el producto: ${order.product}`);
    
    return order;
  }
}

module.exports = OrderApplicationService;