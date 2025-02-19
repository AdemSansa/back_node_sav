const express = require('express');
const   {migrateDatabase} = require('./migration.controller');

const router = express.Router();

// Migrate the database
router.post('/migrate', migrateDatabase);

module.exports = router;
