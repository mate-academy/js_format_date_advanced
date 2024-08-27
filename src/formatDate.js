'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedDate = date.split(fromFormat[3]);

  const yearFormat = fromFormat.includes('YY') ? 'YY' : 'YYYY';

  const year = splittedDate[fromFormat.indexOf(yearFormat)];
  const month = splittedDate[fromFormat.indexOf('MM')];
  const day = splittedDate[fromFormat.indexOf('DD')];

  const newYearFormat = toFormat.includes('YY') ? 'YY' : 'YYYY';

  const newIndexOfYear = toFormat.indexOf(newYearFormat);
  const newIndexOfMonth = toFormat.indexOf('MM');
  const newIndexOfDay = toFormat.indexOf('DD');

  const newDate = [];

  let formatedYear = year;

  if (yearFormat.length - newYearFormat.length === 2) {
    formatedYear = year.slice(2, 4);
  }

  if (yearFormat.length - newYearFormat.length === -2) {
    formatedYear = +year >= 30 ? '19' + year : '20' + year;
  }

  newDate[newIndexOfYear] = formatedYear;
  newDate[newIndexOfMonth] = month;
  newDate[newIndexOfDay] = day;

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
