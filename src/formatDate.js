'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDivider = fromFormat[3];
  const toDivider = toFormat[3];

  const dateValues = date.split(fromDivider);

  const objectDate = {};

  fromFormat.forEach((value, index) => {
    objectDate[value] = dateValues[index];
  });

  if (objectDate['YYYY'] && toFormat.includes('YY')) {
    objectDate['YY'] = objectDate['YYYY'].slice(2);
  }

  if (objectDate['YY'] && toFormat.includes('YYYY')) {
    objectDate['YYYY'] =
      objectDate['YY'] < 30 ? '20' + objectDate['YY'] : '19' + objectDate['YY'];
  }

  const toDate = toFormat
    .slice(0, 3)
    .map((value) => objectDate[value])
    .join(toDivider);

  return toDate;
}

module.exports = formatDate;
