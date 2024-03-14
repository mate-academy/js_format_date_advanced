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
  const fromSeparator = fromFormat[3];
  const dateParts = date.split(fromSeparator);
  const datePartsMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    datePartsMap[fromFormat[i]] = dateParts[i];
  }

  // Конвертація року, якщо це потрібно
  const convertYear = (year, from, to) => {
    if (from === 'YYYY' && to === 'YY') {
      return year.slice(2);
    }

    if (from === 'YY' && to === 'YYYY') {
      return parseInt(year) < 30 ? '20' + year : '19' + year;
    }

    return year;
  };

  // Побудова нової дати у вказаному форматі
  const newDateParts = toFormat.slice(0, 3).map((part) => {
    if (part.includes('YY')) {
      const yearFormat = fromFormat.find((f) => f.includes('YY')) || 'YYYY';

      return convertYear(datePartsMap[yearFormat], yearFormat, part);
    }

    return datePartsMap[part];
  });

  const toSeparator = toFormat[3];

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
