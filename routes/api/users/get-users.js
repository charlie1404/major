const { Users } = require('../../../models');

const getUsers = async (req, res) => {
  const users = await Users.listAll();
  res.status(200);
  res.json(users);
};

module.exports = getUsers;
