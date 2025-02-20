const express = require('express');
const {  createOneValidation,
    readOneValidation,
    updateOneValidation,
    deleteOneValidation,
    updateMeValidation, } =  require('./user.validator')
const {getList, readOne, createOne, updateOne, deleteOne} = require('./user.controller');

const router = express.Router();

router.get('/',  getList);
router.get('/:id', readOneValidation, readOne);
router.post('/', createOneValidation, createOne);
router.put('/:id', updateOneValidation,  updateOne);   
router.delete('/:id', deleteOneValidation, deleteOne);

module.exports = router;
