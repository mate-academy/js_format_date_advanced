'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  fromFormat.forEach((format, index) => {
    dateMap[format] = dateParts[index];
  });

  if (dateMap['YY']) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
  }

  if (dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const newDateParts = toFormat.map((format) => dateMap[format]);

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
