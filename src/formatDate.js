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
  const data = date.split(fromFormat[3]);
  let fourNumbers = true;

  let year;
  let month;
  let day;
  let separator;

  const answer = [];
  let finalFormat = 0;

  for (const time of fromFormat) {
    if (time === 'YY') {
      year = data[fromFormat.indexOf(time)];
      fourNumbers = false;
    } else if (time === 'YYYY') {
      year = data[fromFormat.indexOf(time)];
      fourNumbers = true;
    } else if (time === 'MM') {
      month = data[fromFormat.indexOf(time)];
    } else if (time === 'DD') {
      day = data[fromFormat.indexOf(time)];
    }
  }

  for (const time of toFormat) {
    if (time === 'YY') {
      if (fourNumbers) {
        year = year.split('').splice(2).join('');
      }
      answer.push(year);
    } else if (time === 'YYYY') {
      if (!fourNumbers) {
        if (year < 30) {
          year = 2000 + +year;
        } else {
          year = 1900 + +year;
        }
      }

      answer.push(year);
    } else if (time === 'MM') {
      answer.push(month);
    } else if (time === 'DD') {
      answer.push(day);
    } else {
      separator = time;
    }
  }

  finalFormat = answer.join(separator);

  return finalFormat;
}

module.exports = formatDate;
