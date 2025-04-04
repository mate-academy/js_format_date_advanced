'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const slicedDate = date.split(fromFormat[3]);
  const newSeparator = toFormat[3];

  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  const yearIndex = Math.abs(dayIndex + monthIndex - 3);

  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');
  const newYearIndex = Math.abs(newDayIndex + newMonthIndex - 3);

  let formatedYear = slicedDate[yearIndex];
  const newDateParts = [];

  if (
    fromFormat[yearIndex].length === 4 &&
    toFormat[newYearIndex].length === 2
  ) {
    formatedYear = slicedDate[yearIndex].slice(2);
  }

  if (
    fromFormat[yearIndex].length === 2 &&
    toFormat[newYearIndex].length === 4
  ) {
    formatedYear =
      Number(formatedYear) < 30
        ? `20${slicedDate[yearIndex]}`
        : `19${slicedDate[yearIndex]}`;
  }

  newDateParts[newDayIndex] = slicedDate[dayIndex];
  newDateParts[newMonthIndex] = slicedDate[monthIndex];
  newDateParts[newYearIndex] = formatedYear;

  const newDate = newDateParts.join(newSeparator);

  return newDate;
}

module.exports = formatDate;
