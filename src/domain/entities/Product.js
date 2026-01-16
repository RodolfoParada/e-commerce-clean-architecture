class Product {
  constructor(id, name, price) {
    if (price <= 0) throw new Error('El precio debe ser positivo');
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
module.exports = Product;