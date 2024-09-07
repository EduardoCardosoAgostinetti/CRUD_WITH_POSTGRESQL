const express = require('express');
const app = express();
const port = 3000;

const crud = require('./crud');
app.use('/crud', crud);


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});