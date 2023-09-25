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

const formatDate = (date, fromFormat, toFormat) => {
  const fromDivider = fromFormat[3];
  const toDivider = toFormat[3];
  const fromCode = fromFormat.slice(0, 3);
  const toCode = toFormat.slice(0, 3);
  const dateArray = date.split(fromDivider);
  const result = [];

  const dateMap = toCode.reduce((acc, e, i) => {
    acc[e[0]] = [e, i];

    return acc;
  }, {});

  for (let i = 0; i < fromCode.length; i++) {
    const char = fromCode[i][0];
    const [ code, index ] = dateMap[char];

    if (char !== 'Y') {
      result[index] = dateArray[i];
      continue;
    }

    const century = (+dateArray[i].slice(-2) < 30) ? '20' : '19';

    result[index] = code.length < 3
      ? dateArray[i].slice(code.length)
      : dateArray[i].padStart(code.length, century);
  };

  return result.join(toDivider);
};

module.exports = formatDate;
