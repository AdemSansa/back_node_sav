const mongoose = require('mongoose');
const Migration = require('../models/migration.model');
const User = require('../src/modules/user/user.model');
const Company = require('../models/company.model');
const { sendEmail } = require('../utils/email.service');
const moment = require('moment');

// Helper function to generate a random 4-digit code
const generateCode = () => Math.floor(1000 + Math.random() * 9000).toString();

async function migrate() {
  try {
    // Check if migration has already been applied
    const migration = await Migration.findOne({ name: '20240218_init' });
    if (migration) {
      console.log('Migration already applied.');
      return;
    }

    // Create a default company for initial data
    const defaultCompany = new Company({
      name: 'Conscious Stage',
      industry: 'Technology',
      location: 'Tunisia',
      website: 'https://www.consciousstage.com',
    });

    await defaultCompany.save();

    // Generate a 4-digit code for admin verification
    const verificationCode = generateCode();

    // Create a default admin user with verification code
    const adminUser = new User({
      email: 'admin@consciousstage.com',
      password: '',
      type: 'super',
      company: defaultCompany._id,
      code: {
        value: verificationCode,
        expireIn: moment().add(10, 'minutes').toDate(), // Code expires in 10 minutes
        attempts: 3, // Allow 3 attempts to enter the code
      },
    });

    await adminUser.save();

    // Send the verification code to admin's email
    await sendEmail(
      'admin@consciousstage.com',
      'Your Verification Code',
      `Hello,\n\nYour verification code is: ${verificationCode}\nThis code will expire in 10 minutes.`
    );

    // Log the migration as completed
    const migrationRecord = new Migration({
      name: '20240218_init',
      status: 'completed',
    });

    await migrationRecord.save();

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Error during migration', error);
    const migrationRecord = new Migration({
      name: '20240218_init',
      status: 'failed',
    });

    await migrationRecord.save();
  }
}

module.exports = { migrate };
