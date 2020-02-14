const express = require('express');
const actionRouter = require('./data/routers/actionRouter');
const projectRouter = require('./data/routers/projectRouter');

const server = express();
server.use(express.json());

server.use('/:id/actions', logger, actionRouter);
server.use('/', logger, projectRouter);

// server.get('/home', (req, res) => {
//     res.send(
//         `<h2> Welcome to Node API Sprint Challenge! </h2>`
//     );
// });

//global middleware

function logger(req, res, next) {
    console.log(`${req.method} request made to ${req.originalUrl}`);
    next();
}

module.exports = server;