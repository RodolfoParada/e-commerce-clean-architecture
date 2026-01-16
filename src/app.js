const express = require('express');
const setup = require('./container');

const app = express();
app.use(express.json());

const { controller } = setup();

app.post('/orders', (req, res) => controller.handle(req, res));

app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
  console.log('🚀 Intenta un POST a /orders con { "productId": "1", "quantity": 2 }');
});