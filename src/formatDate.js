'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);

  const oldDayIndex = fromFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');
  const oldYearIndex = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY') : fromFormat.indexOf('YYYY');

  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');
  const newYearIndex = toFormat.includes('YY')
    ? toFormat.indexOf('YY') : toFormat.indexOf('YYYY');

  const day = oldDate[oldDayIndex];
  const month = oldDate[oldMonthIndex];
  const oldYear = oldDate[oldYearIndex];

  const newYear = updateYear(oldYear, fromFormat, toFormat);
  const newDate = [];

  newDate[newDayIndex] = day;
  newDate[newMonthIndex] = month;
  newDate[newYearIndex] = newYear;

  return newDate.join(toFormat[3]);
}

function updateYear(year, oldFormat, newFormat) {
  let updatedYear = year;

  if (oldFormat.includes('YY') && newFormat.includes('YYYY')) {
    updatedYear = +year >= 30 ? `19${year}` : `20${year}`;
  }

  if (oldFormat.includes('YYYY') && newFormat.includes('YY')) {
    updatedYear = year.slice(2);
  }

  return updatedYear;
}

module.exports = formatDate;
