'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedDate = date.split(fromFormat[3]);

  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];
    const value = splitedDate[i];

    dateObject[key] = value;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    dateObject['YYYY'] = Number(dateObject['YY']) < 30
      ? '20' + dateObject['YY']
      : '19' + dateObject['YY'];
  }

  return toFormat.slice(0, 3).map(item => dateObject[item]).join(toFormat[3]);
}

module.exports = formatDate;
