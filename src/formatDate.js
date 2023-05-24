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
  const arrDate = date.split(fromFormat[3]);
  const year = arrDate[getYYYYIndex(fromFormat)];
  const month = arrDate[fromFormat.indexOf('MM')];
  const day = arrDate[fromFormat.indexOf('DD')];

  const result = setResult(year, month, day, toFormat);

  function getYYYYIndex(format) {
    const index = format.indexOf('YY') === -1 ? format.indexOf('YYYY')
      : format.indexOf('YY');

    return index;
  }

  function setResult(toYear, toMonth, toDay, outputFormat) {
    const dateOutArr = [];
    const newYear = toFullFormat(toYear);

    dateOutArr[toFormat.indexOf('DD')] = toDay;
    dateOutArr[toFormat.indexOf('MM')] = toMonth;

    const id = getYYYYIndex(outputFormat);

    if (outputFormat[id] === 'YY') {
      dateOutArr[id] = newYear.substring(2);
    } else {
      dateOutArr[id] = newYear;
    }

    const dateResult = dateOutArr.join(toFormat[3]);

    function toFullFormat(yearInt) {
      if (yearInt > 100) {
        return yearInt;
      }

      if (yearInt < 30) {
        return '20' + yearInt;
      }

      return '19' + yearInt;
    }

    return dateResult;
  }

  return result;
}

module.exports = formatDate;
