const mongoose = require('mongoose');
const User = require('../users/user.schema');

const generateUniqueCode = async () => {
    let code;
    let exists;
    do {
      code = Math.floor(1000 + Math.random() * 9000).toString();
      exists = await User.findOne({ "code.value": code });
    } while (exists);
    return code;
};

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({ "code": { $exists: false } });

  for (let user of users) {
    user.code = { value: await generateUniqueCode(), expireIn: null, attempts: 3 };
    await user.save();
  }

  console.log('Migration completed: Added code field to users.');
  process.exit();
}

migrate();
