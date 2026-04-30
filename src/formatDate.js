'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.at(-1);
  const toSeparator = toFormat.at(-1);

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  fromFormat.forEach((part, index) => {
    if (part !== fromSeparator) {
      dateMap[part] = dateParts[index];
    }
  });

  if (dateMap['YYYY'] && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (dateMap['YY'] && toFormat.includes('YYYY')) {
    const yy = Number(dateMap['YY']);

    dateMap['YYYY'] = yy < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
  }

  return toFormat
    .filter((part) => part !== toSeparator)
    .map((part) => dateMap[part])
    .join(toSeparator);
}

module.exports = formatDate;
