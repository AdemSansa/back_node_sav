const express = require('express');
const {  createOneValidation,
    readOneValidation,
    updateOneValidation,
    deleteOneValidation,
    updateMeValidation, } =  require('./user.validator')
const {getList, readOne, createOne, updateOne, deleteOne ,getUserGrowth} = require('./user.controller');

const router = express.Router();

router.get('/',  getList);
router.post('/', createOneValidation, createOne);
router.delete('/:id', deleteOneValidation, deleteOne);

router.get("/growth", getUserGrowth);




//router for user growth


module.exports = router;
