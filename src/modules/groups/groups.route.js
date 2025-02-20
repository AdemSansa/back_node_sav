const express = require('express');
const {
    getList,
    createOne,
    readOne,
    updateOne,
    deleteOne,
} =require("./groups.controller");

const groupRoute = express.Router();

groupRoute.get('/', getList);
groupRoute.post('/', createOne);
groupRoute.get('/:id', readOne);
groupRoute.put('/:id', updateOne);
groupRoute.delete('/:id', deleteOne);

module.exports = groupRoute;

