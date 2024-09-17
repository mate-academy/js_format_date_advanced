'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let dateSeparator = '/';
  const SEPARATOR_INDEX = 3;

  if (date.includes('-')) {
    dateSeparator = '-';
  } else if (date.includes('.')) {
    dateSeparator = '.';
  }

  const dateArray = date.split(dateSeparator);
  const dateObject = {};
  const result = [];

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateObject.YY < 30) {
      dateObject.YYYY = '20' + dateObject.YY;
    } else {
      dateObject.YYYY = '19' + dateObject.YY;
    }
    delete dateObject.YY;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject.YY = dateObject.YYYY.slice(-2);
    delete dateObject.YYYY;
  }

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    for (const dateKey in dateObject) {
      if (toFormat[i] === dateKey) {
        result.push(dateObject[dateKey]);
      }
    }
  }

  return result.join(toFormat[SEPARATOR_INDEX]);
}

module.exports = formatDate;
