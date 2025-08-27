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

  fromFormat.slice(0, -1).forEach((part, idx) => {
    dateMap[part] = dateParts[idx];
  });

  if (dateMap['YY'] && !dateMap['YYYY']) {
    const yy = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] =
      yy < 30
        ? '20' + dateMap['YY'].padStart(2, 0)
        : '19' + dateMap['YY'].padStart(2, 0);
  }

  if (dateMap['YYYY'] && !dateMap['YY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const result = toFormat
    .slice(0, -1)
    .map((part) => dateMap[part])
    .join(toSeparator);

  return result;
}

module.exports = formatDate;
