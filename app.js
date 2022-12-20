const express = require("express");
const { GetRequest, PostRequest, PutRequest, DeleteRequest } = require("./controllers/Rest");
const cors = require('cors');

// Libreria express
const app = express();

// Con cors se permite conectar con otro puerto local, evitando el error 'Access-Control-Allow-Origin'
app.use(cors());
// Funcion middleware para trabajar con objetos tipo JSON
app.use(express.json());

app.get('/', (req, res) => {server: 'NodeJS'});

app.get('/api/employees', GetRequest);

app.get('/api/employees/:id', GetRequest);

app.post('/api/employees', PostRequest);

app.put('/api/employees/:id', PutRequest );

app.delete('/api/employees/:id', DeleteRequest);

// Puerto del LocalHost
const port = process.env.port || 3030;
app.listen(port, ()=> console.log(`escuchando en el puerto http://localhost:${port}`));