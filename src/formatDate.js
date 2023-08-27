'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],`
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const divider = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(divider);
  let yearIndex = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('YY')) {
      yearIndex = i;
      break;
    } else if (fromFormat[i].includes('YYYY')) {
      yearIndex = i;
      break;
    }
  }

  const year = dateParts[yearIndex];
  let year2 = '';

  if (year.length === 4) {
    year2 = year.slice(2);
  } else {
    year2 = year;
  }

  const year4 = year2 < 30 ? `20${year2}` : `19${year2}`;

  const monthIndex = fromFormat.indexOf('MM');
  const month = dateParts[monthIndex];

  const dayIndex = fromFormat.indexOf('DD');
  const day = dateParts[dayIndex];

  let newYearIndex = 0;

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes('YY')) {
      newYearIndex = i;
      break;
    } else if (toFormat[i].includes('YYYY')) {
      newYearIndex = i;
      break;
    }
  }

  const newYear = toFormat.includes('YY') ? year2 : year4;

  const newMonthIndex = toFormat.indexOf('MM');
  const newMonth = month;

  const newDayIndex = toFormat.indexOf('DD');
  const newDay = day;

  const newDivider = toFormat[toFormat.length - 1];

  const newDate = [];

  newDate[newYearIndex] = newYear;
  newDate[newMonthIndex] = newMonth;
  newDate[newDayIndex] = newDay;

  return newDate.join(newDivider);
}

module.exports = formatDate;
