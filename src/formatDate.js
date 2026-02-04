'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (!fromFormat || fromFormat.length !== 4) {
    return date;
  }

  if (!toFormat || toFormat.length !== 4) {
    return date;
  }

  const partDate = date.split(fromFormat[3]);
  const objectDate = {};

  for (let i = 0; i <= 2; i++) {
    const key = fromFormat[i];

    objectDate[key] = partDate[i];
  }

  const newPartDate = [];

  for (let i = 0; i <= 2; i++) {
    const key = toFormat[i];

    if (key === 'YY' && Object.hasOwn(objectDate, 'YYYY')) {
      newPartDate[i] = objectDate['YYYY'].slice(2);
      continue;
    }

    if (key === 'YYYY' && Object.hasOwn(objectDate, 'YY')) {
      const year = objectDate['YY'];

      newPartDate[i] = +year < 30 ? '20' + year : '19' + year;
      continue;
    }

    newPartDate[i] = objectDate[key];
  }

  return newPartDate.join(toFormat[3]);
}

module.exports = formatDate;
