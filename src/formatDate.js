/* eslint-disable max-len */
/* eslint-disable no-func-assign */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);

  const dateObject = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  if (fromFormat.includes('YY')) {
    const year = dateObject['YY'];

    if (year < 30) {
      dateObject['YYYY'] = '20' + year;
    } else {
      dateObject['YYYY'] = '19' + year;
    }
    delete dateObject['YY'];
  }

  if (toFormat.includes('YY') && dateObject['YYYY']) {
    const year = dateObject['YYYY'].slice(2);

    dateObject['YY'] = year;
    delete dateObject['YYYY'];
  }

  const formattedDate = toFormat
    .map((part, index) => {
      const value = dateObject[part];

      return value;
    })
    .join(toFormat[3]);

  return formattedDate.endsWith(toFormat[3])
    ? formattedDate.slice(0, -1)
    : formattedDate;
}
module.exports = formatDate;
