'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);

  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  if ('YYYY' in dateObj && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(2);
  }

  if ('YY' in dateObj && toFormat.includes('YYYY')) {
    const yy = parseInt(dateObj['YY'], 10);

    dateObj['YYYY'] = yy < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY'];
  }

  const newDateArr = toFormat.slice(0, 3).map((part) => dateObj[part]);

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
