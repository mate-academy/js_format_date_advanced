'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const dateParts = date.split(separatorFrom);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateMap['YY']);

    dateMap['YYYY'] = year < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
  }

  const separatorTo = toFormat[3];
  const newDateParts = toFormat.slice(0, 3).map((part) => dateMap[part]);

  return newDateParts.join(separatorTo);
}

module.exports = formatDate;
