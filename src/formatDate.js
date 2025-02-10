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
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const parts = date.split(separatorFrom);
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  if (fromFormat[0] === 'YYYY' && toFormat[0] === 'YY') {
    dateObj['YY'] = dateObj['YYYY'].slice(2);
  } else if (fromFormat[0] === 'YY' && toFormat[0] === 'YYYY') {
    let yearPrefix;

    if (dateObj['YY'] < '30') {
      yearPrefix = '20';
    } else {
      yearPrefix = '19';
    }
    dateObj['YYYY'] = yearPrefix + dateObj['YY'];
  }

  const newDate = [];

  for (let i = 0; i < 3; i++) {
    newDate.push(dateObj[toFormat[i]]);
  }

  return newDate.join(separatorTo);
}

module.exports = formatDate;
