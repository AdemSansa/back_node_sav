const { errorCatch } = require('../../shared/utils.js');

const Feature = require('./features.schema.js');
const model = Feature;

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
            feature,
        } = req.body;

        const newOne = new model({
            code: feature.code,
            title: feature.title,
            type: feature.type,
            subtitle: feature.subtitle,
            icon: feature.icon,
            link: feature.link,
            order: feature.order,
            status: feature.status,
            featuresIdParent: feature.featuresIdParent,
        });
        await newOne.save();
        return res.status(201).json(newOne);
    } catch (e) {
        return errorCatch(e, res);
    }
}
const readOne = async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) {
            return res.status(404).json({
                message: '404 not found',
            });
        }
        return res.status(200).json(feature);
    } catch (e) {
        return errorCatch(e, res);
    }
};

const updateOne = async (req, res) => {
    try {
        const {
            feature
        } = req.body;

        const updatedOne = await  model.findByIdAndUpdate(req.params.id, {
            code: feature.code,
            title: feature.title,
            type: feature.type,
            subtitle: feature.subtitle,
            icon: feature.icon,
            link: feature.link,
            order: feature.order,
            status: feature.status,
            featuresIdParent: feature.featuresIdParent,
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

    