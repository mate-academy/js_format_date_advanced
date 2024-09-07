'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateStr, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const dateParts = dateStr.split(fromSeparator);

  const dateMap = {};

  fromFormat.forEach((format, index) => {
    dateMap[format] = dateParts[index];
  });

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const newDateParts = toFormat.map((format) => dateMap[format]);

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
