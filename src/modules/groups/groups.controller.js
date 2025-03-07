const { errorCatch } = require('../../shared/utils.js');

const Group = require('./group.schema.js');
const model = Group;
const groupFeat = require('./group-feature.schema.js');
const modelGroupFeature = groupFeat;


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
        console.log( e);
        
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
        console.log(e);
        
    }
}





const CreateOneFeatureGroup = async (req, res) => {
    try {
        const {
            groupFeature,
        } = req.body;

        // check if feature exist 
        const exist = await modelGroupFeature.find({ group: groupFeature.group, feature: groupFeature.feature });
        if (exist.length > 0) {
            return res.status(400).json({
                message: 'Feature already exist',
            });
        }
        const newOne = new modelGroupFeature ({
            group: groupFeature.group,
            feature: groupFeature.feature,
           
        });
        await newOne.save();
        return res.status(201).json(newOne);
    } catch (e) {
        console.log(e);
        
    }
}
const readOneFeatureGroup = async (req, res) => {
    try {
        const groupFeature = await modelGroupFeature.findById(req.params.id);
        if (!groupFeature) {
            return res.status(404).json({
                message: '404 not found',
            });
        }
        return res.status(200).json(groupFeature);
    } catch (e) {
        console.log(e);
        
    }
};
const listGroupFeatures  = async (req, res) => {
    try {
        const { groupId } = req.params;
        
        
    

        const groupFeatures = await modelGroupFeature.find({ group: groupId })
      .exec();
      
      if (!groupFeatures) {
        return res.status(404).json({
          message: '404 not found',
        });

      }
      
      return res.status(200).json(groupFeatures);
    }
    catch(e){
        console.log(e);
    };
}
const updateGroupFeature = async (req, res) => {
    try {
        const {
            groupFeature
        } = req.body;

        const updatedOne = await modelGroupFeature.findByIdAndUpdate(req.params.id, {
            
            read: groupFeature.read,
            create: groupFeature.create,
            delete: groupFeature.delete,
            update: groupFeature.update,
            list: groupFeature.list,
            defaultFeature: groupFeature.defaultFeature,
            status: groupFeature.status,

            updatedAt: Date.now()
        });
        await updatedOne.save();
        
        const group = await model.findById(groupFeature.group);
        console.log(groupFeature);
        
        if (!group) {
            return res.status(404).json({
                message: '404 not found',
            });
        }
        group.updatedAt = Date.now();
        await group.save();

        return res.status(201).json(updatedOne);

    }
    catch (e) {
        console.log(e);
        
    }
}


const deleteOneFeatureGroup = async (req, res) => {
    try {
        console.log(req.params.id);
        
        await modelGroupFeature.findByIdAndDelete(req.params.id);
        return res.status(204).end();
    } catch (e) {
        console.log(e);
        
    }
}
module.exports = {
    getList,
    createOne,
    readOne,
    updateOne,
    deleteOne,
    CreateOneFeatureGroup,
    readOneFeatureGroup,
    listGroupFeatures,
    updateGroupFeature,
    deleteOneFeatureGroup,



};

    