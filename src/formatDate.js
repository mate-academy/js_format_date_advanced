'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const delimiter = date.split(fromFormat[3]);
  const newDateObject = {};

  for (let i = 0; i < 3; i++) {
    newDateObject[fromFormat[i]] = delimiter[i];
  }

  const CURRENT_CENTURY_THRESHOLD = 30;
  const CENTURY_1900 = '19';
  const CENTURY_2000 = '20';

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    newDateObject['YY'] = newDateObject['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(newDateObject['YY']);

    newDateObject['YYYY'] =
      year < CURRENT_CENTURY_THRESHOLD
        ? CENTURY_2000 + newDateObject['YY']
        : CENTURY_1900 + newDateObject['YY'];
  }

  if (toFormat.length >= 4) {
    const newDate = toFormat
      .slice(0, 3)
      .map((part) => newDateObject[part])
      .join(toFormat[3]);

    return newDate;
  } else {
    throw new Error('Invalid toFormat: it should have at least 4 elements.');
  }
}

module.exports = formatDate;
