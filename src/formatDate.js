'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const dateNumbers = date.split(fromFormat[3]);

  const fromIndexOfDD = fromFormat.indexOf('DD');
  const toIndexOfDD = toFormat.indexOf('DD');

  newDate[toIndexOfDD] = dateNumbers[fromIndexOfDD];

  const fromIndexOfMM = fromFormat.indexOf('MM');
  const toIndexOfMM = toFormat.indexOf('MM');

  newDate[toIndexOfMM] = dateNumbers[fromIndexOfMM];

  const fromIndexOfYear = 3 - fromIndexOfMM - fromIndexOfDD;
  const toIndexOfYear = 3 - toIndexOfMM - toIndexOfDD;

  let year = dateNumbers[fromIndexOfYear];

  if (
    fromFormat[fromIndexOfYear] === 'YYYY' &&
    toFormat[toIndexOfYear] === 'YY'
  ) {
    year = year.slice(-2);
  } else if (
    fromFormat[fromIndexOfYear] === 'YY' &&
    toFormat[toIndexOfYear] === 'YYYY'
  ) {
    const yearNumber = parseInt(year, 10);

    if (yearNumber < 30) {
      year = `20${year}`;
    } else {
      year = `19${year}`;
    }
  }

  newDate[toIndexOfYear] = year;

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
