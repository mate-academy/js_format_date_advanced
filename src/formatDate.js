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

const fromIndexFinder = (formats, formatToFind) => {
  return formats.findIndex(format => format.includes(formatToFind));
};

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const formattedDate = [];

  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[toFormat.length - 1];

  const splittedDate = date.split(fromSeparator);

  const fromIndexY = fromIndexFinder(fromFormat, 'Y');
  const fromIndexM = fromIndexFinder(fromFormat, 'M');
  const fromIndexD = fromIndexFinder(fromFormat, 'D');
  const toIndexY = fromIndexFinder(toFormat, 'Y');

  toFormat.forEach((format, idx) => {
    if (format.includes('Y')) {
      formattedDate[idx] = splittedDate[fromIndexY];
    }

    if (format.includes('M')) {
      formattedDate[idx] = splittedDate[fromIndexM];
    }

    if (format.includes('D')) {
      formattedDate[idx] = splittedDate[fromIndexD];
    }
  });

  // Validations conditions
  const isToFormatYearLess = (toFormat[toIndexY].length === 2
    && fromFormat[fromIndexY].length === 4);
  const isFromFormatYearLess = (toFormat[toIndexY].length === 4
    && fromFormat[fromIndexY].length === 2);
  const isTwentyCentury = Number(splittedDate[toIndexY]) < 30;
  const isNineteenthCentury = Number(splittedDate[toIndexY]) >= 30;

  // Year format validation
  if (isToFormatYearLess) {
    formattedDate[toIndexY] = splittedDate[toIndexY]
      .split('')
      .slice(2, 4)
      .join('');
  }

  // Year value validation
  const yearFormatter = (yearToFormat) => {
    formattedDate[toIndexY] = `${yearToFormat}${splittedDate[toIndexY]}`;
  };

  if (isFromFormatYearLess && isTwentyCentury) {
    yearFormatter('20');
  }

  if (isFromFormatYearLess && isNineteenthCentury) {
    yearFormatter('19');
  }

  return formattedDate.join(toSeparator);
}

module.exports = formatDate;
