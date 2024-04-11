'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDateSeparator = fromFormat[fromFormat.length - 1];
  const newDateSeparator = toFormat[toFormat.length - 1];
  const parts = date.split(oldDateSeparator);

  const dateObjects = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObjects[fromFormat[i]] = parts[i];
  }

  if (dateObjects['YYYY'] && !dateObjects['YY']) {
    dateObjects['YY'] = dateObjects['YYYY'].slice(-2);
  }

  if (dateObjects['YY'] && !dateObjects['YYYY']) {
    dateObjects['YYYY'] =
      dateObjects['YY'] < 30
        ? '20' + dateObjects['YY']
        : '19' + dateObjects['YY'];
  }

  const newDateParts = toFormat.slice(0, -1);
  const newDateFormat = newDateParts.map((format) => dateObjects[format]);

  return newDateFormat.join(newDateSeparator);
}

module.exports = formatDate;
