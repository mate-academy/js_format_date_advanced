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
  const dateArray = date.split(fromFormat[3]);
  const dateObject = {};

  for (let i = 0; i <= 2; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  let year = dateObject['YYYY'] || dateObject['YY'];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  dateObject['YYYY'] = year;
  dateObject['YY'] = year;

  const newDate = [];

  for (let i = 0; i <= 2; i++) {
    newDate.push(dateObject[toFormat[i]]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
