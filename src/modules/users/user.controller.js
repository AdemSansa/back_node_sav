const user = require('./user.schema');
const model = user;
const { errorCatch } = require('../../shared/utils');

const getList = async (req, res) => {
    try {
        const users = await model.find();
        res.json(users);
    } catch (error) {
        errorCatch(error, res);
    }
    };

const readOne = async (req, res) => {
    try {
        const user = await model.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        errorCatch(res, error);
    }
    };

const createOne = async (req, res) => {
    try {
        const {user} = req.body;      
      const newOne = new model({
        email: user.email,
        password: user.password,
        company: user.company,
        type: user.type,
        code: {
          value: user.code.value,
          expireIn: user.code.expireIn,
          attempts: user.code.attempts,
        },
        });




        
        await newOne.save();
        res.json({ message: 'User created successfully' });
    } catch (error) {
        errorCatch(error, res);
    }
    }
const updateOne = async (req, res) => {
    try {
        const user = await model.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        Object.assign(user, req.body);
        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        errorCatch(res, error);
    }
    }
const deleteOne = async (req, res) => {
    try {
        await model.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        errorCatch(res, error);
    }
    }
module.exports = { getList, readOne, createOne, updateOne, deleteOne };

