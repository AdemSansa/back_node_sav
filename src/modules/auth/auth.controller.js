const user = require('../users/user.schema')
const model = user;
const { errorCatch } = require('../../shared/utils');
const jwt = require('jsonwebtoken');
const config = require("../../config/config");
const bcrypt = require('bcryptjs'); 
const { verify } = require('crypto');

    const registerUser = async (req, res) => {
        try {
            const { user } = req.body;
            //hash password

            const salt = await bcrypt.genSalt(10); // Generate a salt
            const hashedPassword = await bcrypt.hash(user.password, salt); // Hash the password
        
         

            const newUser = new model({
                email: user.email,
                password: hashedPassword,
                company: user.company,
                firstname: user.firstname,
                lastname: user.lastname,
            });
            await newUser.save();
            res.json({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

const login = async (req, res) => {
    try {
        const { email,password } = req.body;
    
        // Find the user by email
        const user = await model.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password');
        }
    
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }
        console.log(user);
        
    
        // Generate a JWT
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          config.jwtSecret,
          { expiresIn: config.jwtExpiration }
        );
    
        res.json({ token });
      }
        catch (error) {
            console.error(error);
            throw new Error('Invalid email or password');
        }
    }
const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error('Token is required');
      }
  
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
    
module.exports = {registerUser,login,verifyToken};

