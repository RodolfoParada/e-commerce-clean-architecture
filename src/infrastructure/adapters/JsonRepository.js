const fs = require('fs').promises;
const path = require('path');

class JsonRepository {
  constructor() {
    // Simulamos una base de datos en un archivo JSON
    this.filePath = path.join(__dirname, 'db.json');
  }

  async findById(id) {
    const data = await fs.readFile(this.filePath, 'utf-8');
    const products = JSON.parse(data);
    return products.find(p => p.id === id);
  }
}

module.exports = JsonRepository;