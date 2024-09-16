'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const dateObject = {};
  const splitedData = date.split(fromFormat[3]);

  for (let i = 0; i < splitedData.length; i++) {
    dateObject[fromFormat[i]] = splitedData[i];
  }

  if ('YYYY' in dateObject) {
    dateObject['YY'] = dateObject['YYYY'].slice(2);
  }

  dateObject['YYYY'] = +dateObject['YY'] < 30 ? `20${dateObject['YY']}` : `19${dateObject['YY']}`;

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateObject[toFormat[i]]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
