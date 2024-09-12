'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const partsDate = date.split(oldSeparator);

  const objDate = {};

  for (let i = 0; i < partsDate.length; i++) {
    objDate[fromFormat[i]] = partsDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (objDate['YY'] < 30) {
      objDate['YYYY'] = '20' + objDate['YY'];
    } else {
      objDate['YYYY'] = '19' + objDate['YY'];
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    objDate['YY'] = objDate['YYYY'].slice(2);
  }

  const newDate = [];

  for (const param of toFormat) {
    newDate.push(objDate[param]);
  }

  // delete last element(undefined).
  newDate.pop();

  const newSeparator = toFormat[3];

  const updateDate = newDate.join(newSeparator);

  return updateDate;
}

module.exports = formatDate;
