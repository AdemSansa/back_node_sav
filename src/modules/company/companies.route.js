const express = require('express');
const { getList, readOne,createOne,deleteOne,updateOne,}= require('./companies.controller');

const router = express.Router();




router.get('/', getList);
router.post('/', createOne);
router.get('/:id', readOne);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

module.exports = router;