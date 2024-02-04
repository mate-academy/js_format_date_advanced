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
 *   ['DD', 'MM', 'YY', '/'],
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
  const currentSeparator = fromFormat[3];
  const dateSplited = date.split(currentSeparator);
  const [oldYear, month, day] = splitOldDate(dateSplited, fromFormat);
  const newYear = setNewYear(oldYear, toFormat);
  const newDayMonthYear = [day, month, newYear];
  const correctDate = setCorrectDate(newDayMonthYear, toFormat);

  return correctDate;
}

function splitOldDate(date, fromFormat) {
  const oldYearMonthDay = [];

  if (fromFormat.indexOf('YY') >= 0) {
    oldYearMonthDay.push(date[fromFormat.indexOf('YY')]);
  } else {
    oldYearMonthDay.push(date[fromFormat.indexOf('YYYY')]);
  }

  oldYearMonthDay.push(date[fromFormat.indexOf('MM')]);
  oldYearMonthDay.push(date[fromFormat.indexOf('DD')]);

  return oldYearMonthDay;
}

function setNewYear(oldYear, toFormat) {
  const SHORT_YEAR_FORMAT_LENGTH = 2;
  const LONG_YEAR_FORMAT_LENGTH = 4;
  const CENTURE_19 = '19';
  const CENTURE_20 = '20';

  if (toFormat.includes('YY') && oldYear.length !== SHORT_YEAR_FORMAT_LENGTH) {
    return oldYear.slice(2);
  }

  if (toFormat.includes('YYYY') && oldYear.length !== LONG_YEAR_FORMAT_LENGTH) {
    if (oldYear < 30) {
      return CENTURE_20 + oldYear;
    }

    return CENTURE_19 + oldYear;
  }

  return oldYear;
}

function setCorrectDate([day, month, year], toFormat) {
  const newSeparator = toFormat[3];
  const indexOfDay = toFormat.indexOf('DD');
  const indexOfMonth = toFormat.indexOf('MM');
  const indexOfYear = toFormat.includes('YY')
    ? toFormat.indexOf('YY')
    : toFormat.indexOf('YYYY');
  const correctDate = [];

  correctDate[indexOfDay] = day;
  correctDate[indexOfMonth] = month;
  correctDate[indexOfYear] = year;

  return correctDate.join(newSeparator);
}

module.exports = formatDate;
