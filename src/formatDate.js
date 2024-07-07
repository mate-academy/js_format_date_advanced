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

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (dateMap['YYYY'] && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(2);
  } else if (dateMap['YY'] && toFormat.includes('YYYY')) {
    dateMap['YYYY'] =
      dateMap['YY'] < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
  }

  const newDate = toFormat
    .slice(0, 3)
    .map((part) => dateMap[part])
    .join(toSeparator);

  return newDate;
}

module.exports = formatDate;
