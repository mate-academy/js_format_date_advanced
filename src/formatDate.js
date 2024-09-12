'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const separatedDate = date.split(oldSeparator);

  const day = separatedDate[fromFormat.indexOf('DD')];
  const month = separatedDate[fromFormat.indexOf('MM')];
  let year
    = fromFormat.includes('YYYY')
      ? separatedDate[fromFormat.indexOf('YYYY')]
      : separatedDate[fromFormat.indexOf('YY')];

  if (toFormat.includes('YYYY') && year.length === 2) {
    if (+year < 30) {
      year = 20 + year;
    } else {
      year = 19 + year;
    }
  }

  if (toFormat.includes('YY') && year.length === 4) {
    year = year.slice(2);
  }

  separatedDate[toFormat.indexOf('DD')] = day;
  separatedDate[toFormat.indexOf('MM')] = month;

  const newFormatYearIndex = toFormat.includes('YYYY')
    ? toFormat.indexOf('YYYY')
    : toFormat.indexOf('YY');

  separatedDate[newFormatYearIndex] = year;

  return separatedDate.join(newSeparator);
}

module.exports = formatDate;
