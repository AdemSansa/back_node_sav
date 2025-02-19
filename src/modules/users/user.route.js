const express = require('express');
const {userValidator} = require('./user.validator')
const {getList, readOne, createOne, updateOne, deleteOne} = require('./user.controller');

const router = express.Router();

router.get('/', getList);
router.get('/:id', readOne);
router.post('/',  createOne);
router.put('/:id',  updateOne);   
router.delete('/:id', deleteOne);

module.exports = router;
