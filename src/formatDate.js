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
  const newFormatDate = [];
  const initialFormatDate = date.split(fromFormat[3]);
  const indexOfDay = fromFormat.indexOf('DD');
  const indexOfMonth = fromFormat.indexOf('MM');
  let indexOfYear;

  if (fromFormat.indexOf('YYYY') === -1) {
    indexOfYear = fromFormat.indexOf('YY');
  } else {
    indexOfYear = fromFormat.indexOf('YYYY');
  }

  const actualDate = {
    DD: initialFormatDate[indexOfDay],
    MM: initialFormatDate[indexOfMonth],
    YY: initialFormatDate[indexOfYear],
  };

  const { YY } = actualDate;

  for (const key of toFormat) {
    switch (key) {
      case 'DD':
        newFormatDate.push(actualDate.DD);
        break;
      case 'MM':
        newFormatDate.push(actualDate.MM);
        break;
      case 'YY':
        if (YY.length === 4) {
          newFormatDate.push(actualDate.YY[2] + actualDate.YY[1]);
        } else {
          newFormatDate.push(actualDate.YY);
        }
        break;
      case 'YYYY':
        if (YY.length === 2 && actualDate.YY >= 30) {
          newFormatDate.push('19' + actualDate.YY);
        } else if (YY.length === 2 && actualDate.YY < 30) {
          newFormatDate.push('20' + actualDate.YY);
        } else {
          newFormatDate.push(actualDate.YY);
        }
        break;
      default:
        break;
    }
  }

  return newFormatDate.join(toFormat[3]);
}

module.exports = formatDate;
