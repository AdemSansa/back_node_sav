const user = require('./user.schema');
const model = user;
const { errorCatch } = require('../../shared/utils');

const getList = async (req, res) => {
    try {
        const users = await model.find();
        res.json(users);
    } catch (error) {
        errorCatch(error,res);
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
        firstname: user.firstname,
        lastname: user.lastname,
        });




        
        await newOne.save();
        res.json({ message: 'User created successfully' });
    } catch (error) {
    }
    }

const deleteOne = async (req, res) => {
    try {
        await model.findByIdAndDelete(req.params._id);
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
    }
    }

    const getUserGrowth = async (req, res) => {
        try {
            const { groupBy } = req.query; // Accept grouping parameter (day, week, month)
            console.log(groupBy);
            
            let dateFormat;
            switch (groupBy) {
                case "month":
                    dateFormat = "%Y-%m"; // Format as YYYY-MM
                    break;
                case "week":
                    dateFormat = "%Y-%U"; // Format as YYYY-WEEK
                    break;
                case "day":
                default:
                    dateFormat = "%Y-%m-%d"; // Format as YYYY-MM-DD
                    break;
            }
    
            // Aggregation pipeline to group users by creation date
            const userGrowth = await model.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: dateFormat, date: "$createdAt" } },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } } // Sort by date
            ]);
    
            res.json(userGrowth);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    
module.exports = { getList, createOne, deleteOne ,getUserGrowth};

