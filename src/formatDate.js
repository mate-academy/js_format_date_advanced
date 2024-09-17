'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDate = date.split(fromFormat[3]);
  const toDate = [null, null, null];

  toDate[toFormat.indexOf('DD')]
  = fromDate.splice(fromFormat.indexOf('DD'), 1)[0];

  toDate[toFormat.indexOf('MM')]
  = fromDate.splice(fromFormat.indexOf('MM'), 1)[0];

  let year = fromDate[0];

  const toYearIndex = toDate.indexOf(null);
  const toYearFormat = toFormat[toYearIndex];

  year = year.length > toYearFormat.length
    ? year.slice(2)
    : year.length < toYearFormat.length
      ? year < 30
        ? '20'.concat(year)
        : '19'.concat(year)
      : year;

  toDate[toYearIndex] = year;

  return toDate.join(toFormat[3]);
}

module.exports = formatDate;
