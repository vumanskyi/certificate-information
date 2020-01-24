const https = require('https');
const pemEncode = require('./decode');
/**
 * Simple url validation
 * @param {string} url
 * @throws Error
 */
const validationURL = (url) => {
  if (url.length <= 0 || typeof url !== 'string') {
    throw Error('URL is not valid');
  }
};

/**
 * @param {string} url
 * @returns {Promise}
 */
const httpRequest = (url) => new Promise(((resolve, reject) => {
  if (validationURL(url)) {
    reject('Wrong url');
  }

  const request = https.get(url, (response) => {
    const {
      valid_from, valid_to, raw, subject,
    } = response.socket.getPeerCertificate(true);

    const certificate = pemEncode(raw.toString('base64'), 64);

    resolve({
      validFrom: valid_from,
      validTo: valid_to,
      certificate,
      Country: subject.C,
      postalCode: subject.postalCode,
      State: subject.ST,
      City: subject.L,
      Street: subject.street,
      Organization: subject.O,
      CommonName: subject.CN,
    });
  });

  // reject on request error
  request.on('error', (err) => {
    reject(err);
  });

  request.end();
}));

module.exports = httpRequest;
