

const express = require ('express');                                 // requerindo o pacote express, para ajudar em rotas
const cors = require('cors');
const routes = require('./routes');

                                                                      // express disponivel agora em apenas tag "app"

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
/*
* Rota/recurso
*/
/*
*
* GET: bucar uma informação do back end
* POST : Criar uma informação no back end
* PUT : Alterar uma informação no back end
* DELETE : deletar uma informação no back end
*/
/*
*    Tipos de parâmetros:
*
* Query Params: Parâmetros nomeados enviados na rota após "?" (filtros,paginaçao)
* Route Params: Parâmetros utilizados para identificar recursos
* Request Body: Corpo da requisição , utilizado para criar ou alterar recursos
*/
/*
* SQL(formato para se comunicar com banco de dados)
* SQL : MySQL , SQLite , PostgreSQL , Oracle , Microsoft SQL server
* NoSQL : MongoDB , CouchDB, etc
*/

/*
* BANCO DE DADOS 
* Driver: SELECT * FROM users
* Query Builder : table('users').select ('*').where();
*/


app.listen(3333);

