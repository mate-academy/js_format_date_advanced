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
  const partMap = {};

  fromFormat.forEach((part, index) => {
    partMap[part] = index;
  });

  const dateParts = date.split(
    fromFormat.find(
      part => part !== 'YYYY' && part !== 'YY' && part !== 'MM' && part !== 'DD'
    )
  );

  let year = dateParts[partMap['YYYY']] || dateParts[partMap['YY']];
  const month = dateParts[partMap['MM']];
  const day = dateParts[partMap['DD']];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(-2);
  };

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    year = parseInt(year, 10);

    if (year < 10) {
      year = '200' + year;
    } else if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  const timeSeparator = toFormat.find(
    part => part !== 'YYYY' && part !== 'YY' && part !== 'MM' && part !== 'DD'
  ) || '';

  const reorderedDateParts = toFormat.map(part => {
    if (part === 'YYYY') {
      return year;
    };

    if (part === 'YY' && !year.includes('YY')) {
      return year.slice(-2);
    };

    if (part === 'MM') {
      return month;
    };

    if (part === 'DD') {
      return day;
    };

    return part;
  });

  const newDate = reorderedDateParts.join(timeSeparator);

  return newDate.slice(0, -2);
}

module.exports = formatDate;
