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
  const CENTURE_XXI = '20';
  const CENTURE_XX = '19';
  let year = '';
  let month = '';
  let day = '';
  const dateValuesNew = [];

  const separatorOld = fromFormat[fromFormat.length - 1];
  const separatorNew = toFormat[toFormat.length - 1];

  const dataValuesOld = date.split(separatorOld);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const part = fromFormat[i];

    switch (part) {
      case 'YY':
      case 'YYYY':
        year = dataValuesOld[i];
        break;
      case 'MM':
        month = dataValuesOld[i];
        break;
      case 'DD':
        day = dataValuesOld[i];
        break;
      default:
        return `Unknown date format ${part}`;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];
    let changeYear = year;

    switch (part) {
      case 'YYYY':
        if (year.length === 2) {
          changeYear = year < 30
            ? `${CENTURE_XXI}${year}`
            : `${CENTURE_XX}${year}`;
        }
        dateValuesNew.push(changeYear);
        break;
      case 'YY':
        dateValuesNew.push(year.substring(2));
        break;
      case 'MM':
        dateValuesNew.push(month);
        break;
      case 'DD':
        dateValuesNew.push(day);
        break;
      default:
        return `Unknown date format ${part}`;
    }
  }

  return dateValuesNew.join(separatorNew);
}

module.exports = formatDate;
