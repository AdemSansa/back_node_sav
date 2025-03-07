const express = require('express');
const {
    getList,
    createOne,
    readOne,
    updateOne,
    deleteOne,
    CreateOneFeatureGroup,
    readOneFeatureGroup,
    listGroupFeatures,
    updateGroupFeature,
    deleteOneFeatureGroup

} =require("./groups.controller");

const groupRoute = express.Router();

groupRoute.get('/', getList);
groupRoute.post('/', createOne);
groupRoute.get('/:id', readOne);
groupRoute.put('/:id', updateOne);
groupRoute.delete('/:id', deleteOne);


//group features route 
groupRoute.post('/feature', CreateOneFeatureGroup);
groupRoute.get('/feature/:id', readOneFeatureGroup);
groupRoute.get('/:groupId/features', listGroupFeatures);
groupRoute.put('/feature/:id', updateGroupFeature);
groupRoute.delete('/feature/:id', deleteOneFeatureGroup);
module.exports = groupRoute;

