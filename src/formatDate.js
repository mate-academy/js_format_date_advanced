'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const objDate = {};
  const arrDate = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    objDate[fromFormat[i]] = arrDate[i];
  }

  if (objDate['YY']) {
    if (objDate['YY'] < 30) {
      objDate['YYYY'] = 20 + objDate['YY'];
    } else {
      objDate['YYYY'] = 19 + objDate['YY'];
    }
  } else {
    objDate['YY'] = objDate['YYYY'].slice(2);
  }

  for (let j = 0; j < 3; j++) {
    newDate.push(objDate[toFormat[j]]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
