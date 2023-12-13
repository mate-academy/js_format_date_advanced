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
  const factDate = date.split(fromFormat[fromFormat.length - 1]);
  const fromFormatCopy = [...fromFormat];
  const resultArray = [...toFormat];
  const LONG_YEAR_FORMAT = 'YYYY';
  const SHORT_YEAR_FORMAT = 'YY';

  fromFormatCopy.splice(-1, 1);
  resultArray.splice(-1, 1);

  if ((fromFormatCopy.includes(LONG_YEAR_FORMAT)
    && toFormat.includes(LONG_YEAR_FORMAT))
    || (fromFormatCopy.includes(SHORT_YEAR_FORMAT)
    && toFormat.includes(SHORT_YEAR_FORMAT))) {
    cycle(fromFormatCopy, toFormat, resultArray, factDate);
  }

  if (fromFormatCopy.includes(LONG_YEAR_FORMAT)
    && toFormat.includes(SHORT_YEAR_FORMAT)) {
    const longDateIndex = fromFormatCopy.indexOf(LONG_YEAR_FORMAT);

    factDate[longDateIndex] = factDate[longDateIndex].slice(-2);

    fromFormatCopy[longDateIndex] = SHORT_YEAR_FORMAT;
    cycle(fromFormatCopy, toFormat, resultArray, factDate);
  }

  if (fromFormatCopy.includes(SHORT_YEAR_FORMAT)
    && toFormat.includes(LONG_YEAR_FORMAT)) {
    const shortDateIndex = fromFormatCopy.indexOf(SHORT_YEAR_FORMAT);

    fromFormatCopy[shortDateIndex] = LONG_YEAR_FORMAT;

    if (factDate[shortDateIndex] < 30) {
      factDate[shortDateIndex] = `20${factDate[shortDateIndex]}`;
    } else {
      factDate[shortDateIndex] = `19${factDate[shortDateIndex]}`;
    }

    cycle(fromFormatCopy, toFormat, resultArray, factDate);
  }

  return resultArray.join(toFormat[toFormat.length - 1]);
}

function cycle(
  fromFormatCopyCycle,
  toFormatCycle,
  resultArrayCycle,
  factDateCycle
) {
  for (let i = 0; i < fromFormatCopyCycle.length; i++) {
    const index = toFormatCycle.indexOf(fromFormatCopyCycle[i]);

    resultArrayCycle[index] = factDateCycle[i];
  }
}

module.exports = formatDate;
