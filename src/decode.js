/**
 * @param {string} str
 * @param {number} n
 * @returns {string}
 */
const pemEncode = (str, n) => {
  const ret = [];
  for (let i = 1; i <= str.length; i += 1) {
    ret.push(str[i - 1]);
    const mod = i % n;
    if (mod === 0) {
      ret.push('\n');
    }
  }
  return `-----BEGIN CERTIFICATE-----\n${ret.join('')}\n-----END CERTIFICATE-----`;
};

module.exports = pemEncode;
