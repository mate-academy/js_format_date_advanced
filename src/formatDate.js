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
  const fromSeparator = fromFormat[3];
  const values = date.split(fromSeparator);
  const monthIndex = fromFormat.indexOf('MM');
  const monthValue = values[monthIndex];
  const dayIndex = fromFormat.indexOf('DD');
  const dayValue = values[dayIndex];
  const isYearFormat = fromFormat.includes('YYYY');
  const yearIndex = yearsFormatter(isYearFormat, fromFormat);
  const yearValue = values[yearIndex];
  const convertedMonthIndex = toFormat.indexOf('MM');
  const convertedDayIndex = toFormat.indexOf('DD');
  const isConvertedYearFormat = toFormat.includes('YYYY');
  const convertedYearIndex = yearsFormatter(isConvertedYearFormat, toFormat);
  const convertedYearValue = yearsConverter(
    isYearFormat, isConvertedYearFormat, yearValue
  );
  const reorderedValues = reorder(
    monthValue, dayValue, convertedYearValue,
    convertedMonthIndex, convertedDayIndex, convertedYearIndex
  );
  const toSeparator = toFormat[3];

  return reorderedValues.join(toSeparator);
}

function yearsFormatter(isYear, array) {
  if (isYear) {
    return array.indexOf('YYYY');
  } else {
    return array.indexOf('YY');
  }
}

function yearsConverter(isYear, isConvertedYear, yearValue) {
  if (isYear === true && isConvertedYear === true) {
    return yearValue;
  }

  if (isYear === false && isConvertedYear === false) {
    return yearValue;
  }

  if (isYear === false && isConvertedYear === true) {
    if (+yearValue < 30) {
      return +yearValue + 2000;
    } else {
      return +yearValue + 1900;
    }
  }

  if (isYear === true && isConvertedYear === false) {
    return yearValue[2] + yearValue[3];
  }
}

function reorder(
  monthValue, dayValue, yearValue,
  monthIndex, dayIndex, yearIndex
) {
  const results = [];

  results[monthIndex] = monthValue;
  results[dayIndex] = dayValue;
  results[yearIndex] = yearValue;

  return results;
}

module.exports = formatDate;
