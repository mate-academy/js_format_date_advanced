'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const year4 = 'YYYY';
  const year2 = 'YY';

  const separatedDate = date.split(fromFormat[3]);

  const dateData = {};

  for (let i = 0; i < separatedDate.length; i++) {
    dateData[fromFormat[i]] = separatedDate[i];
  }

  if (!dateData[year4]) {
    if (dateData[year2] < 30) {
      dateData[year4] = `20${dateData[year2]}`;
    } else {
      dateData[year4] = `19${dateData[year2]}`;
    }
  } else {
    dateData[year2] = dateData[year4].slice(2, 4);
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateData[toFormat[i]]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
