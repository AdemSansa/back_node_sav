const { errorCatch } = require('../../shared/utils.js');

const Group = require('./group.schema.js');
const model = Group;

const getList = async (req, res) => {
    try {
        const list = await model.find();
        return res.status(200).json(list);
    } catch (e) {
        return errorCatch(e, res);
    }
    };
const createOne = async (req, res) => {
    try {
        const {
            group,
        } = req.body;

        const newOne = new model({
           
            code: group.code,
            label: group.label,
            features: group.features,


        });
        await newOne.save();
        return res.status(201).json(newOne);
    } catch (e) {
        return errorCatch(e, res);
    }
}
const readOne = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({
                message: '404 not found',
            });
        }
        return res.status(200).json(group);
    } catch (e) {
        return errorCatch(e, res);
    }
};

const updateOne = async (req, res) => {
    try {
        const {
            group
        } = req.body;

        const updatedOne = await  model.findByIdAndUpdate(req.params.id, {
            code: group.code,
            label: group.label,
            features: group.features,
            
        }, { new: true });
        return res.status(201).json(updatedOne);
    }
    catch (e) {
        return errorCatch(e, res);
    }
}
const deleteOne = async (req, res) => {
    try {
        await model.findByIdAndDelete(req.params.id);
        return res.status(204).end();
    } catch (e) {
        return errorCatch(e, res);
    }
}
module.exports = {
    getList,
    createOne,
    readOne,
    updateOne,
    deleteOne,
};

    