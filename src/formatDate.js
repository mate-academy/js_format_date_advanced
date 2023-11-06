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
  const newDate = [];
  const source = date.split(fromFormat[3]);
  let year = '';

  function insertYear(fromYear, toYear) {
    const fromIndexYear = fromFormat.indexOf(fromYear);
    const toIndexYear = toFormat.indexOf(toYear);

    newDate[toIndexYear] = source[fromIndexYear];
  }

  newDate[toFormat.indexOf('DD')] = source[fromFormat.indexOf('DD')];
  newDate[toFormat.indexOf('MM')] = source[fromFormat.indexOf('MM')];

  switch (true) {
    case (fromFormat.includes('YY') && toFormat.includes('YY')):
      insertYear('YY', 'YY');
      break;

    case (fromFormat.includes('YYYY') && toFormat.includes('YYYY')):
      insertYear('YYYY', 'YYYY');
      break;

    case (fromFormat.includes('YY') && toFormat.includes('YYYY')):
      insertYear('YY', 'YYYY');
      year = newDate[toFormat.indexOf('YYYY')];

      if (newDate[toFormat.indexOf('YYYY')] < 30) {
        newDate[toFormat.indexOf('YYYY')] = `20${year}`;
        break;
      }
      newDate[toFormat.indexOf('YYYY')] = `19${year}`;

      break;

    case (fromFormat.includes('YYYY') && toFormat.includes('YY')):
      insertYear('YYYY', 'YY');
      year = newDate[toFormat.indexOf('YY')];
      newDate[toFormat.indexOf('YY')] = year.slice(2);
      break;
    default:
      return;
  };

  return (newDate.join(toFormat[3]));
}

module.exports = formatDate;
