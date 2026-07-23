'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldFormat = fromFormat[3];
  const newFormat = toFormat[3];
  const parts = date.split(oldFormat);
  const obj = {};
  const x = toFormat[0];
  const y = toFormat[1];
  const z = toFormat[2];

  for (let i = 0; i <= 2; i++) {
    obj[fromFormat[i]] = parts[i];
  }

  if (obj.YY) {
    obj.YYYY = Number(obj.YY) < 30 ? `20${obj.YY}` : `19${obj.YY}`;
  }

  if (obj.YYYY) {
    obj.YY = obj.YYYY.slice(-2);
  }

  const res = [obj[x], obj[y], obj[z]].join(newFormat);

  return res;
}

module.exports = formatDate;
