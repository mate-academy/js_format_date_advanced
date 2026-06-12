'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let separator = '';

  for (let i = 0; i < date.length; i++) {
    if (date[i] < '0' || date[i] > '9') {
      separator = date[i];
      break;
    }
  }

  const parts = date.split(separator);

  const result = {};

  for (let i = 0; i < fromFormat.length; i++) {
    let value = parts[i];
    const key = fromFormat[i];

    if (key === 'YYYY') {
      value = value.slice(-2);
    }

    if (key === 'YY') {
      if (Number(value) < 30) {
        value = '20' + value;
      } else {
        value = '19' + value;
      }
    }

    let normalizedKey = key;

    if (key === 'YY') {
      normalizedKey = 'YYYY';
    }
    result[normalizedKey] = value;
    result[key] = value;
  }

  const output = [];

  for (let i = 0; i < toFormat.length; i++) {
    output.push(result[toFormat[i]]);
  }

  return output.join(toFormat[3]);
}

module.exports = formatDate;
