class OrderController {
  constructor(placeOrderUseCase) {
    this.placeOrderUseCase = placeOrderUseCase;
  }

  async handle(req, res) {
    try {
      const { productId, quantity } = req.body;
      const result = await this.placeOrderUseCase.execute(productId, quantity);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
module.exports = OrderController;