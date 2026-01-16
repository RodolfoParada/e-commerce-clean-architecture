class InMemoryRepository {
  constructor() {
    this.products = [
      { id: '1', name: 'Laptop Gamer', price: 1200 },
      { id: '2', name: 'Mouse Pro', price: 50 }
    ];
  }
  async findById(id) {
    return this.products.find(p => p.id === id);
  }
}
module.exports = InMemoryRepository;