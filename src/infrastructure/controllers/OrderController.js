class OrderController {
  constructor(orderAppService) {
    this.orderAppService = orderAppService;
  }

  async handle(req, res) {
    try {
      const { productId, quantity } = req.body;
      
      // Llamamos al servicio de aplicación
      const result = await this.orderAppService.createOrder(productId, quantity);
      
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = OrderController;