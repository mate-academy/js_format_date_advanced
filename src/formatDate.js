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
  const SEPARATOR_INDEX = 3;
  const dateParts = date.split(fromFormat[SEPARATOR_INDEX]);
  const yearShort = dateParts[fromFormat.indexOf('YY')];
  const yearLong = dateParts[fromFormat.indexOf('YYYY')];
  const mounth = dateParts[fromFormat.indexOf('MM')];
  const day = dateParts[fromFormat.indexOf('DD')];

  let frmtdDate = '';

  for (let i = 0, len = SEPARATOR_INDEX - 1; ; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (yearLong !== undefined) {
          frmtdDate += yearLong;
          break;
        }

        frmtdDate += (+yearShort >= 30 ? '19' : '20') + yearShort;
        break;
      case 'YY':
        if (yearShort !== undefined) {
          frmtdDate += yearShort;
          break;
        }

        frmtdDate += yearLong.slice(2);
        break;
      case 'MM':
        frmtdDate += mounth;
        break;
      case 'DD':
        frmtdDate += day;
        break;

      default:
        return undefined;
    }

    if (i >= len) {
      break;
    }

    frmtdDate += toFormat[SEPARATOR_INDEX];
  }

  return frmtdDate;
}

module.exports = formatDate;
