const express = require('express');
const actionRouter = require('./data/routers/actionRouter');
const projectRouter = require('./data/routers/projectRouter');

const server = express();
server.use(express.json());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

//global middleware



module.exports = server;