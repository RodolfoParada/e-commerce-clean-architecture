class PlaceOrder {
  constructor(productRepository, paymentService) {
    this.productRepository = productRepository;
    this.paymentService = paymentService;
  }

  async execute(productId, quantity) {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new Error('Producto no encontrado');

    const total = product.price * quantity;
    const payment = await this.paymentService.process(total);

    return {
      orderId: Date.now(),
      product: product.name,
      total: total,
      status: payment.success ? 'PAID' : 'FAILED'
    };
  }
}
module.exports = PlaceOrder;