'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const array = date.split(fromFormat[3]);
  const values = {};

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];
    let val = array[i];

    if (key === 'YY' || key === 'YYYY') {
      if (val.length === 2) {
        if (Number(val) < 30) {
          val = '20' + val;
        } else {
          val = '19' + val;
        }
      }
      values['YYYY'] = val;
    } else {
      values[key] = val;
    }
  }

  const result = [];

  for (let j = 0; j < 3; j++) {
    const target = toFormat[j];

    if (target === 'YYYY') {
      result.push(values['YYYY']);
    } else if (target === 'YY') {
      result.push(values['YYYY'].slice(-2));
    } else {
      result.push(values[target]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
