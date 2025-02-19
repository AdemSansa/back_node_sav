const Migration = require('./migration.model');
const { migrate } = require('./2025-02-18_add_code');

exports.migrateDatabase = async (req, res) => {
  try {
    await migrate();
    res.status(200).json({ message: 'Migration completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Migration failed', error });
  }
};
