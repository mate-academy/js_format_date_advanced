'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if (dateMap['YYYY']) {
    dateMap.year = dateMap['YYYY'];
  } else if (dateMap['YY']) {
    const year = Number(dateMap['YY']);
    dateMap.year = year < 30
      ? '20' + dateMap['YY']
      : '19' + dateMap['YY'];
  }

  dateMap['YYYY'] = dateMap.year;
  dateMap['YY'] = dateMap.year.slice(-2);

  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(dateMap[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
