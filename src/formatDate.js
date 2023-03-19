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
  const initialformat = fromFormat.slice(0, 3);
  const innitSeparator = fromFormat.slice(-1).toString();
  const initialDate = date.split(innitSeparator);

  const finalDate = toFormat.slice(0, 3);
  const finalSeparator = toFormat.slice(-1).toString();

  const finalFromat = [];

  let day;
  let month;
  let year;

  for (let i = 0; i < initialformat.length; i++) {
    if (initialformat[i] === 'DD') {
      day = initialDate[i];
    }

    if (initialformat[i] === 'MM') {
      month = initialDate[i];
    }

    if (initialformat[i] === 'YY' || initialformat[i] === 'YYYY') {
      year = initialDate[i];
    }
  }

  if (year.length < 4) {
    year = +year < 30 ? `20${year}` : `19${year}`;
  }

  for (let i = 0; i < finalDate.length; i++) {
    if (finalDate[i] === 'DD') {
      finalFromat.push(day);
    }

    if (finalDate[i] === 'MM') {
      finalFromat.push(month);
    }

    if (finalDate[i] === 'YYYY') {
      finalFromat.push(year);
    }

    if (finalDate[i] === 'YY') {
      finalFromat.push(year.slice(-2));
    }
  }

  return finalFromat.join(finalSeparator).toString();
}

module.exports = formatDate;
