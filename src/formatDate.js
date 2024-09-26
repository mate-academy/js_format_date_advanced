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
  const dateArr = date.split(fromFormat[3]);
  const dateArrOredered = [];

  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  const yearIndex = fromFormat.indexOf('YY') === -1
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');

  const neededDayIndex = toFormat.indexOf('DD');
  const neededMonthIndex = toFormat.indexOf('MM');
  const neededYearIndex = toFormat.indexOf('YY') === -1
    ? toFormat.indexOf('YYYY')
    : toFormat.indexOf('YY');
  const dontChangeYear = fromFormat[yearIndex] === toFormat[neededYearIndex];

  dateArrOredered[neededDayIndex] = dateArr[dayIndex];
  dateArrOredered[neededMonthIndex] = dateArr[monthIndex];
  dateArrOredered[neededYearIndex] = dateArr[yearIndex];

  if (dontChangeYear) {
    return dateArrOredered.join(toFormat[3]);
  }

  const formatedDate
  = Number(dateArrOredered[neededYearIndex]) < 30 ? '20' : '19';

  if (toFormat[neededYearIndex] === 'YYYY') {
    dateArrOredered[neededYearIndex]
    = formatedDate + dateArrOredered[neededYearIndex];
  }

  if (toFormat[neededYearIndex] === 'YY') {
    dateArrOredered[neededYearIndex]
    = dateArrOredered[neededYearIndex].slice(2);
  }

  return dateArrOredered.join(toFormat[3]);
}

module.exports = formatDate;
