const { Mails } = require('../../../models');

const getMails = async (req, res) => {
  const mails = await Mails.listAll(req.client.aud);
  res.status(200);
  res.json(mails);
};

module.exports = getMails;
