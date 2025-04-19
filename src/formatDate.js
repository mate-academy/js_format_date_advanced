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
  const oldDate = date.split(oldSeparator);

  function findIndex(format, value) {
    for (let i = 0; i < format.length; i++) {
      if (format[i] === value) {
        return i;
      }
    }
  }

  const day = oldDate[findIndex(fromFormat, 'DD')];
  const month = oldDate[findIndex(fromFormat, 'MM')];
  const year = oldDate[findIndex(fromFormat, 'YYYY')];
  const shortYear = oldDate[findIndex(fromFormat, 'YY')];

  const newDayIndex = findIndex(toFormat, 'DD');
  const newMonthIndex = findIndex(toFormat, 'MM');
  const newYearIndex = findIndex(toFormat, 'YYYY') ?? findIndex(toFormat, 'YY');

  const newSeparator = toFormat[toFormat.length - 1];
  const newDate = [];

  newDate[newDayIndex] = day;
  newDate[newMonthIndex] = month;

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    newDate[newYearIndex] = year.slice(2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    newDate[newYearIndex] =
      shortYear < 30 ? `20${shortYear}` : `19${shortYear}`;
  } else {
    newDate[newYearIndex] = year || shortYear;
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
