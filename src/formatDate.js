'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const givenDate = {
    [fromFormat[0]]: dateArray[0],
    [fromFormat[1]]: dateArray[1],
    [fromFormat[2]]: dateArray[2],
  };
  const dateInNewFormat = [];

  if (givenDate.YY <= 23) {
    givenDate.YYYY = `20${[givenDate.YY]}`;
  }

  if (givenDate.YY > 23) {
    givenDate.YYYY = `19${[givenDate.YY]}`;
  }

  if (givenDate.hasOwnProperty('YYYY')) {
    givenDate.YY = givenDate.YYYY.slice(2);
  };

  for (let i = 0; i < toFormat.length - 1; i++) {
    dateInNewFormat.push(givenDate[toFormat[i]]);
  }

  return dateInNewFormat.join(`${toFormat[3]}`);
}
module.exports = formatDate;
