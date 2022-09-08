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
  const resultDate = [];
  const separatorTypeFromFormat = fromFormat[fromFormat.length - 1];
  const separatorTypeToFormat = toFormat[toFormat.length - 1];
  const dateArr = date.split(separatorTypeFromFormat);
  const fromFormatYearIndex = findDatePartsIndex(fromFormat, 'YY');
  const fromFormatDayIndex = findDatePartsIndex(fromFormat, 'DD');
  const fromFormatMonthIndex = findDatePartsIndex(fromFormat, 'MM');
  const toFormatYearIndex = findDatePartsIndex(toFormat, 'YY');
  const toFormatMonthIndex = findDatePartsIndex(toFormat, 'MM');
  const toFormatDayIndex = findDatePartsIndex(toFormat, 'DD');

  for (let i = 0; i < dateArr.length; i++) {
    switch (i) {
      case fromFormatDayIndex:
        resultDate[toFormatDayIndex] = dateArr[i];
        break;
      case fromFormatMonthIndex:
        resultDate[toFormatMonthIndex] = dateArr[i];
        break;
      case fromFormatYearIndex:
        if (toFormat[toFormatYearIndex].length
          < fromFormat[fromFormatYearIndex].length) {
          resultDate[toFormatYearIndex] = dateArr[i].slice(-2);
        } else if (fromFormat[fromFormatYearIndex].length
            < toFormat[toFormatYearIndex].length) {
          if (dateArr[fromFormatYearIndex] < 30) {
            resultDate[toFormatYearIndex] = ['20', dateArr[i]].join('');
          } else {
            resultDate[toFormatYearIndex] = ['19', dateArr[i]].join('');
          }
        } else {
          resultDate[toFormatYearIndex] = dateArr[i];
        }
        break;
      default:
        return false;
    }
  }

  return resultDate.join(separatorTypeToFormat);
}

function findDatePartsIndex(arr, type) {
  const typeFour = type.repeat(2);

  return arr.findIndex(el => el === type || el === typeFour);
}

module.exports = formatDate;
