const express = require('express');
const app = express();

app.use(express.json());

const materialsRouter = require('./routes/materials');
app.use('/api/materials', materialsRouter);

const categoriesRouter = require('./routes/categories');
app.use('/api/categories', categoriesRouter);

const ordersRouter = require('./routes/orders');
app.use('/api/orders', ordersRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});