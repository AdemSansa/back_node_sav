const Company = require('./company.schema');
const model = Company

const {errorCatch}= require('../../shared/utils');


const createOne = async (req, res) => {
    try {
        const {
            company,
        } = req.body;

        const newOne = new model({
            name: company.name,
            address: company.address,
            email: company.email,
            phone: company.phone,
        });
        await newOne.save();
        return res.status(201).json(newOne);
    } catch (e) {
       errorCatch(e, res);
       
    }
}
const getList = async (req, res) => {
    try {
        const list = await model.find();
        return res.status(200).json(list);
    } catch (e) {

        errorCatch(e, res);
    }
    };

const readOne = async (req, res) => {
    try {
        const company = await model.findById(req.params.id);
        if (!company) {
            return res.status(404).json({
                message: '404 not found',
            });
        }
        return res.status(200).json(company);
    } catch (e) {
        errorCatch(e, res);        
    }
};

const updateOne = async (req, res) => {
    try {
        const {
            company
        } = req.body;

        const updatedOne = await
        model.findByIdAndUpdate(req.params.id, {
            name: company.name,
            address: company.address,
            email: company.email,
            phone: company.phone,
            
        }, { new: true });
        return res.status(201).json(updatedOne);
    }
    catch (e) {
        errorCatch(e, res);        
        }
}


const deleteOne = async (req, res) => {
    try {
        await model.findByIdAndDelete(req.params.id);
        return res.status(204).json();
    }
    catch (e) {
        errorCatch(e, res);        
    }
}

module.exports = {
    createOne,
    getList,
    readOne,
    updateOne,
    deleteOne
}