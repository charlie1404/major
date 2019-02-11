const { Users } = require('../../../models');

const getUsers = async (req, res) => {
  const users = await Users.find({}, '-__v -password -salt -createdAt -updatedAt');
  res.status(200);
  res.json(users);
};

module.exports = getUsers;
