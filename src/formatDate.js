'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromSeparator);
  const dateMap = {};

  fromFormat.slice(0, -1).forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (dateMap['YYYY'] && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
    delete dateMap['YYYY'];
  }

  if (dateMap['YY'] && toFormat.includes('YYYY')) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;

    delete dateMap['YY'];
  }

  const newDateParts = toFormat.slice(0, -1).map((part) => dateMap[part] || '');

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
