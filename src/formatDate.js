'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The functionge a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.n can cha
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
  const dayParts = date.split(fromFormat[fromFormat.length - 1]);

  let day = '';
  let month = '';
  let year = '';
  const devider = toFormat[toFormat.length - 1];

  for (let i = 0; i < dayParts.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = dayParts[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dayParts[i];
    }

    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dayParts[i];
    }
  }

  let formattedDate = '';

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      if (year.length === 2) {
        let yearToNum = parseInt(year, 10);

        if (yearToNum < 30) {
          yearToNum += 2000;
        } else {
          yearToNum += 1900;
        }

        year = yearToNum.toString();
      } else if (toFormat[i] === 'YY') {
        if (year.length === 4) {
          year = year.slice(2);
        }
      }
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'MM') {
      formattedDate += month + devider;
    } else if (toFormat[i] === 'DD') {
      formattedDate += day + devider;
    } else if (toFormat[i] === 'YYYY') {
      formattedDate += year + devider;
    } else if (toFormat[i] === 'YY') {
      formattedDate += year.slice(2) + devider;
    }
  }

  return formattedDate.slice(0, -1);
}

module.exports = formatDate;
