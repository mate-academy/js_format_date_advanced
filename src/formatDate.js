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
  const formatParts = fromFormat.slice(0, -1);
  const newOrder = toFormat.slice(0, -1);
  const dateParts = date.split(separatorFrom);
  const newDateParts = [];
  const dateMap = {};

  for (let i = 0; i < formatParts.length; i++) {
    dateMap[formatParts[i]] = dateParts[i];
  }

  if (toFormat.includes('YY') && dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(2);
  }

  if (toFormat.includes('YYYY') && dateMap['YY']) {
    const yy = parseInt(dateMap['YY']);

    if (yy < 30) {
      dateMap['YYYY'] = '20' + dateMap['YY'];
    } else {
      dateMap['YYYY'] = '19' + dateMap['YY'];
    }
  }

  for (const part of newOrder) {
    const value = dateMap[part];

    newDateParts.push(value);
  }

  return newDateParts.join(separatorTo);
}

module.exports = formatDate;
