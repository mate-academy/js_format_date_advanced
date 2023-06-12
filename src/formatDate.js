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
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const dateParts = date.split(`${separatorFrom}`);
  const dateData = {};

  for (const [index, part] of Object.entries(dateParts)) {
    if (fromFormat[index].startsWith('YY')) {
      dateData['year'] = dateParts[index];
      continue;
    }

    dateData[fromFormat[index]] = part;
  }

  const yearFormat = toFormat.find(
    dateFormat => ['YY', 'YYYY'].includes(dateFormat)
  );
  const formatedYear = formatYear(dateData['year'], yearFormat);
  const formatedDate = [];

  for (const part of toFormat) {
    if (!part.startsWith('YY')) {
      formatedDate.push(dateData[part]);
      continue;
    }

    formatedDate.push(formatedYear);
  }

  return formatedDate.join(`${separatorTo}`);
}

function formatYear(year, format) {
  if (year.length === format.length) {
    return year;
  }

  if (format === 'YY') {
    return year.slice(2);
  }

  return year < 30 && format === 'YYYY'
    ? `20${year}`
    : `19${year}`;
}

module.exports = formatDate;
