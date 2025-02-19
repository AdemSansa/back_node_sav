const errorCatch = (error, res) => {
    if (error && error.message) {
      console.error(error.message);
      return res.status(500).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({
      message: 'Server Error',
    });
  };
  
  module.exports = {
    errorCatch,
  };
  