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
  const dateSeparator = fromFormat[3];
  const splitDate = date.split(dateSeparator);
  const dateMap = splitDate.reduce(
    (acc, nextVal, index) => ({ ...acc,
      [fromFormat[index].charAt(0)]: nextVal }),
    {}
  );

  const resultArray = [];

  for (const key of toFormat) {
    const keyChar = key.charAt(0);

    switch (keyChar) {
      case 'D':
      case 'M':
        resultArray.push(dateMap[keyChar]);
        break;
      case 'Y':
        if (dateMap[keyChar].length === 4 && key.length === 2) {
          dateMap[keyChar] = dateMap[keyChar].slice(2);
        }

        if (dateMap[keyChar].length === 2 && key.length === 4) {
          const year = Number(dateMap[keyChar]) >= 30 ? '19' : '20';

          dateMap[keyChar] = `${year}${dateMap[keyChar]}`;
        }
        resultArray.push(dateMap[keyChar]);
        break;
    }
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
