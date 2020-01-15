const express = require('express');
const mongoose = require ('mongoose');
const routes = require ('./routes');
const INFO = require ('./utils/mongoInfo');

const app = express();

mongoose.connect(INFO.DB_SERVER, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.json());
app.use(routes);

//  Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params:    request.query (Filtros, ordenação, paginação,....)
// Route Params:    request.params (Identificar um recurso na alteração ou remoção)
// Body:            request.body (Dados para criação ou alteração de um registro)



// MongoDB (Banco Não-Relacional)



app.listen(3333); 