const express = require('express');
const {
    getList,
    createOne,
    readOne,
    updateOne,
    deleteOne,
} = require('./features.controller');

const featureRoute = express.Router();
featureRoute.get( '/', getList);
featureRoute.post('/', createOne);
featureRoute.get('/:id', readOne);
featureRoute.patch('/:id', updateOne);
featureRoute.delete('/:id', deleteOne);

module.exports = featureRoute;
