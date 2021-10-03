const isNumberMiddleware = async (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      status: "Fail",
      message: "Please, insert the param ID as a number. :)",
    });
  }

  next();
};

module.exports = isNumberMiddleware;
