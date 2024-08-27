'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedDate = date.split(fromFormat[fromFormat.length - 1]);
  const dateProperties = {};
  const updatedDate = [];

  for (let i = 0; i < 3; i++) {
    dateProperties[fromFormat[i]] = splittedDate[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateProperties['YY'] = dateProperties['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateProperties.YY < 30) {
      dateProperties['YYYY'] = '20' + dateProperties['YY'];
    } else {
      dateProperties['YYYY'] = '19' + dateProperties['YY'];
    }
  }

  for (let i = 0; i < 3; i++) {
    updatedDate.push(dateProperties[toFormat[i]]);
  }

  return updatedDate.join(toFormat[3]);
}

module.exports = formatDate;
