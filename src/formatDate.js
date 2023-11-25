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
  const lastIndex = fromFormat.length - 1;
  const splitedDate = date.split(fromFormat[lastIndex]);
  const formatedDate = [];

  for (let i = 0; i < lastIndex; i++) {
    if (toFormat.includes(fromFormat[i])) {
      const indexToAdd = toFormat.indexOf(fromFormat[i]);

      formatedDate[indexToAdd] = splitedDate[i];
    }
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const [index, normalizedDate] = formatYear(
      fromFormat, 'YY', toFormat, 'YYYY', splitedDate
    );

    formatedDate[index] = normalizedDate;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const [index, normalizedDate] = formatYear(
      fromFormat, 'YYYY', toFormat, 'YY', splitedDate
    );

    formatedDate[index] = normalizedDate;
  }

  return formatedDate.join(toFormat[lastIndex]);
}

function formatYear(fromArray, fromDateYear, toArray, toDateYear, date) {
  const fromDate = fromArray.indexOf(fromDateYear);
  const index = toArray.indexOf(toDateYear);
  const newDateNum = date[fromDate];
  let normalizedDate = '';

  if (fromDateYear === 'YY') {
    normalizedDate = newDateNum < 30
      ? `20${newDateNum}`
      : `19${newDateNum}`;
  } else {
    normalizedDate = newDateNum.slice(2);
  }

  return [index, normalizedDate];
}

module.exports = formatDate;
