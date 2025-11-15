'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let separator = fromFormat[fromFormat.length - 1];
  const parts = date.split(separator);
  const result = [];

  let yearIndex =
    fromFormat.indexOf('YYYY') !== -1
      ? fromFormat.indexOf('YYYY')
      : fromFormat.indexOf('YY');

  let monthIndex = fromFormat.indexOf('MM');
  let dayIndex = fromFormat.indexOf('DD');

  let year = parts[yearIndex];
  const month = parts[monthIndex];
  const day = parts[dayIndex];

  separator = toFormat[toFormat.length - 1];

  yearIndex =
    toFormat.indexOf('YYYY') !== -1
      ? toFormat.indexOf('YYYY')
      : toFormat.indexOf('YY');

  year = convertYear(year, toFormat[yearIndex].length);

  monthIndex = toFormat.indexOf('MM');
  dayIndex = toFormat.indexOf('DD');
  result[yearIndex] = year;
  result[monthIndex] = month;
  result[dayIndex] = day;

  return result.join(separator);
}

function convertYear(year, toFormatYearLength) {
  if (toFormatYearLength === 2) {
    return year.length === 2 ? year : year.slice(2);
  }

  if (toFormatYearLength === 4) {
    return year.length === 4 ? year : +year < 30 ? '20' + year : '19' + year;
  }
}

module.exports = formatDate;
