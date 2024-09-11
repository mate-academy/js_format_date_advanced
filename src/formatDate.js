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
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  const year =
    dateMap['YYYY'] ||
    (dateMap['YY']
      ? (parseInt(dateMap['YY'], 10) < 30 ? '20' : '19') + dateMap['YY']
      : null);
  const month = dateMap['MM'];
  const day = dateMap['DD'];

  const outputParts = toFormat.map((formatPart) => {
    if (formatPart === 'YYYY') {
      return year;
    }

    if (formatPart === 'YY') {
      return year.slice(-2);
    }

    if (formatPart === 'MM') {
      return month;
    }

    if (formatPart === 'DD') {
      return day;
    }

    return '';
  });

  const toSeparator = toFormat[toFormat.length - 1];

  return outputParts.filter((part) => part !== '').join(toSeparator);
}

module.exports = formatDate;
