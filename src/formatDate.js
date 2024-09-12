'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const dateObject = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  };

  const shortYear = 'YY';
  const fullYear = 'YYYY';
  const limit = '30';
  const beforeLimit = '20';
  const aboveLimit = '19';

  if (!(shortYear in dateObject)) {
    dateObject[shortYear] = dateObject[fullYear].slice(2);
  };

  if (!(fullYear in dateObject)) {
    dateObject[fullYear] = dateObject[shortYear] < limit
      ? beforeLimit + [dateObject[shortYear]]
      : aboveLimit + [dateObject[shortYear]];
  };

  const convertArray = [];

  for (let j = 0; j < toFormat.length - 1; j++) {
    convertArray.push(dateObject[toFormat[j]]);
  }

  return convertArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
