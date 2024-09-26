'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const elDate = date.split(fromFormat[3]);
  const forDate = {
    [fromFormat[0]]: elDate[0],
    [fromFormat[1]]: elDate[1],
    [fromFormat[2]]: elDate[2],
  };

  if (forDate.YYYY && toFormat.includes('YY')) {
    forDate.YY = forDate.YYYY.slice(2);
  } else if (forDate.YY && toFormat.includes('YYYY')) {
    if (forDate.YY < 30) {
      forDate.YYYY = 20 + forDate.YY;
    } else {
      forDate.YYYY = 19 + forDate.YY;
    }
  }

  return `${
    forDate[toFormat[0]]}${toFormat[3]}${
    forDate[toFormat[1]]}${toFormat[3]}${
    forDate[toFormat[2]]}`;
}

module.exports = formatDate;
