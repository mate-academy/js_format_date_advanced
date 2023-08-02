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
  const splitDate = date.split(fromFormat[3]);
  const fromMp = splitDate.reduce(
    (acc, nextVal, index) => ({ ...acc,
      [fromFormat[index].charAt(0)]: nextVal }),
    {}
  );

  const resultArray = [];

  for (const key of toFormat) {
    const keyChar = key.charAt(0);

    switch (keyChar) {
      case 'D':
        resultArray.push(fromMp[keyChar]);
        break;
      case 'M':
        resultArray.push(fromMp[keyChar]);
        break;
      case 'Y':
        if (fromMp[keyChar].length === 4 && key.length === 2) {
          fromMp[keyChar] = fromMp[keyChar].slice(2);
        }

        if (fromMp[keyChar].length === 2 && key.length === 4) {
          if (Number(fromMp[keyChar]) >= 30) {
            fromMp[keyChar] = '19' + fromMp[keyChar];
          } else {
            fromMp[keyChar] = '20' + fromMp[keyChar];
          }
        }
        resultArray.push(fromMp[keyChar]);
        break;
    }
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
