module.exports.getOneUser_get = (req, res) => {
  res.json({
    user: req.Profile,
  });
};
