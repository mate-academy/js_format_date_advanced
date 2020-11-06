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
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  let index = 0;
  const formattedDateArr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    index = fromFormat.indexOf(toFormat[i]);

    if (index === -1 && toFormat[i] === `YY`) {
      index = fromFormat.indexOf(`YYYY`);
      formattedDateArr[i] = dateArr[index].split(``).slice(2).join(``);

      continue;
    }

    if (index === -1 && toFormat[i] === `YYYY`) {
      index = fromFormat.indexOf(`YY`);

      if (+dateArr[index] < 30) {
        const newArr = dateArr[index].split(` `);

        newArr.unshift(`20`);

        formattedDateArr[i] = newArr.join(``);

        continue;
      } else {
        const newArr = dateArr[index].split(``);

        newArr.unshift(19);

        formattedDateArr[i] = newArr.join(``);
      }

      continue;
    }

    formattedDateArr[i] = dateArr[index];
  }

  const formattedDateStr = formattedDateArr.join(toFormat[toFormat.length - 1]);

  return formattedDateStr;
}

module.exports = formatDate;
