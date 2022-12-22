exports.createUser = (req, res) => {
  console.log("Create USER.................");
};

module.exports.getOneUser_get = (req, res) => {
  res.json({
    user: req.Profile,
  });
};
