const urlEncode = (str) => {
  const encoded = Buffer.from(str).toString('base64');
  return encoded.replace('+', '-').replace('/', '_').replace(/=+$/, '');
};

const urlDecode = (str) => {
  let replacedStr = str.replace('-', '+').replace('_', '/');
  while (str.length % 4) {
    replacedStr += '=';
  }
  return Buffer.from(replacedStr, 'base64').toString('utf8');
};

module.exports = {
  urlEncode,
  urlDecode,
};
