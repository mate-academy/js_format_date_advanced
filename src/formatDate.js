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
  const dateAsObject = {};
  const formatedDate = [];
  const fromSeparator = fromFormat.slice(-1);
  const toSeparator = toFormat.slice(-1);
  const dateAsArray = date.split(fromSeparator);
  const toDateFormat = toFormat.slice(0, -1);

  dateAsArray.forEach((e, i) => {
    const dateFormat = fromFormat[i];

    if (!toFormat.includes(dateFormat)) {
      const year = dateFormat === 'YY' ? 'YYYY' : 'YY';

      dateAsObject[year] = formatYear(e);

      return;
    }

    dateAsObject[dateFormat] = e;
  });

  toDateFormat.forEach((e) => {
    formatedDate.push(dateAsObject[e]);
  });

  return formatedDate.join(toSeparator);
}

function formatYear(year) {
  const minYear = 30;
  const gratertCentury = '20';
  const lowerCentury = '19';

  if (year.length < 3) {
    return +year < minYear ? gratertCentury + year : lowerCentury + year;
  }

  return year.slice(-2);
}

module.exports = formatDate;
