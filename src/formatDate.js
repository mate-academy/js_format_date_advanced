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
  // write code here
  const formattedDate = [];

  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const splittedDate = date.split(fromSeparator);

  const fromIndexFinder = (formatToFind) => {
    return fromFormat
      .indexOf(fromFormat.find(format => format.includes(formatToFind)));
  };

  const fromIndexY = fromIndexFinder('Y');
  const fromIndexM = fromIndexFinder('M');
  const fromIndexD = fromIndexFinder('D');

  const toIndexY = toFormat
    .indexOf(toFormat.find(format => format.includes('Y')));

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

  const isToFormatYearLess = (toFormat[toIndexY].length === 2
    && fromFormat[fromIndexY].length === 4);
  const isFromFormatYearLess = (toFormat[toIndexY].length === 4
    && fromFormat[fromIndexY].length === 2);

  if (isToFormatYearLess) {
    formattedDate[toIndexY] = splittedDate[toIndexY]
      .split('')
      .slice(2, 4)
      .join('');
  }

  if (isFromFormatYearLess && Number(splittedDate[toIndexY]) < 30) {
    formattedDate[toIndexY] = `20${splittedDate[toIndexY]}`;
  }

  if (isFromFormatYearLess && Number(splittedDate[toIndexY]) >= 30) {
    formattedDate[toIndexY] = `19${splittedDate[toIndexY]}`;
  }

  return formattedDate.join(toSeparator);
}

module.exports = formatDate;
