const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_MAIL_SEND_API);

const send = async (req, res) => {

  const msg = {
    to: req.body.to,
    from: req.client.aud,
    subject: req.body.subject,
    text: req.body.message,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      const err = {
        action: 'send Mail',
        message: 'Error Sending Mail',
        error: error.message,
        code: error.code,
        response: error.response,
      };
      throw err;
    });
};

module.exports = send;
