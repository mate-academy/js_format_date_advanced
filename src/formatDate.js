'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const objDate = {};
  const newFormat = [];

  const arrDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objDate[fromFormat[i]] = arrDate[i];
  }

  if (!objDate.hasOwnProperty('YY')) {
    objDate.YY = objDate.YYYY.slice(-2);
  }

  if (!objDate.hasOwnProperty('YYYY')) {
    if (objDate.YY < 30) {
      objDate.YYYY = `20${objDate.YY}`;
    } else {
      objDate.YYYY = `19${objDate.YY}`;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (objDate.hasOwnProperty(toFormat[i])) {
      newFormat.push(objDate[toFormat[i]]);
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
