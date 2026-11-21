'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const dateData = date.split(fromFormat[3], 3);

  const fullYearIndex = fromFormat.indexOf('YYYY');
  const shortYearIndex = fromFormat.indexOf('YY');

  let fullYear, shortYear;

  if (toFormat.includes('YYYY')) {
    if (fullYearIndex !== -1) {
      fullYear = dateData[fullYearIndex];
    } else if (shortYearIndex !== -1) {
      fullYear = dateData[shortYearIndex];

      if (fullYear < 30) {
        fullYear = '20' + fullYear;
      } else if (fullYear < 100) {
        fullYear = '19' + fullYear;
      }
    }
  }

  if (toFormat.includes('YY')) {
    if (shortYearIndex !== -1) {
      shortYear = dateData[shortYearIndex];
    } else if (fullYearIndex !== -1) {
      shortYear = dateData[fullYearIndex].slice(-2);
    }
  }

  const month = dateData[fromFormat.indexOf('MM')];
  const day = dateData[fromFormat.indexOf('DD')];

  return toFormat
    .slice(0, -1)
    .join(toFormat.at(-1))
    .replace('YYYY', fullYear)
    .replace('YY', shortYear)
    .replace('MM', month)
    .replace('DD', day);
}

module.exports = formatDate;
