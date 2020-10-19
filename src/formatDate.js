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
  const correctDate = [];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const newDate = date.split(oldSeparator);

  const day = newDate[fromFormat.indexOf('DD')];
  const month = newDate[fromFormat.indexOf('MM')];
  let year;

  if (fromFormat.includes('YYYY')) {
    year = newDate[fromFormat.indexOf('YYYY')];
  } else if (fromFormat.includes('YY')) {
    const shortYear = newDate[fromFormat.indexOf('YY')];

    if (shortYear > 20 && shortYear < 99) {
      year = `19${shortYear}`;
    } else {
      year = `20${shortYear}`;
    }
  }

  for (const key of toFormat) {
    switch (key) {
      case 'DD':
        correctDate.push(day);
        break;
      case 'MM':
        correctDate.push(month);
        break;
      case 'YYYY':
        correctDate.push(year);
        break;
      case 'YY':
        correctDate.push(year.substr(2, 4));
        break;
    };
  }

  return correctDate.join(newSeparator);
}

module.exports = formatDate;
