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
  let day = '';
  let month = '';
  let year = '';
  const newdate = [];
  const oldFormat = fromFormat.join();
  const newFormat = toFormat.join();

  const currentDate = date.split(fromFormat[3]);

  for (let i = 0; i < 5; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = currentDate[i];
    }

    if (fromFormat[i] === 'DD') {
      day = currentDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = currentDate[i];
    }
  }

  const shortYear = year.slice(2);

  if (oldFormat.length > newFormat.length) {
    year = shortYear;
  }

  const longNewYear = `20${year}`;
  const longOldYear = `19${year}`;

  if (oldFormat.length < newFormat.length) {
    if (parseInt(year) < 30) {
      year = longNewYear;
    } else {
      year = longOldYear;
    }
  }

  /* console.log(year); */

  for (let i = 0; i < 4; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      newdate[i] = year;
    }

    if (toFormat[i] === 'DD') {
      newdate[i] = day;
    }

    if (toFormat[i] === 'MM') {
      newdate[i] = month;
    }
  }

  const answer = `${newdate[0]}${toFormat[3]}${newdate[1]}${toFormat[3]}${newdate[2]}`;

  return answer;
}

module.exports = formatDate;
