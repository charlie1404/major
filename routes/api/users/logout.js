const logout = async (req, res) => {
  Object.keys(req.cookies)
    .forEach((cookie) => {
      res.cookie(cookie, '', { expires: new Date(0) });
    });

  res.end();
};

module.exports = logout;
