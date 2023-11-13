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
  const fromThisSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];
  let year, smallYear, month, day;
  const resultArr = [];
  let resultDate = '';

  const yearString = 'YYYY';
  const smallYearString = 'YY';
  const monthString = 'MM';
  const dayString = 'DD';

  const fromArray = date.split(fromThisSep);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case yearString: {
        year = fromArray[i];

        break;
      }

      case smallYearString: {
        smallYear = fromArray[i];

        break;
      }

      case monthString: {
        month = fromArray[i];

        break;
      }

      case dayString: {
        day = fromArray[i];

        break;
      }
    }
  }

  if (year !== undefined && year !== null) {
    smallYear = year.slice(2);
  }

  if (smallYear !== undefined && smallYear !== null) {
    if (smallYear < 30) {
      year = 2000 + Number(smallYear);
    } else {
      year = 1900 + Number(smallYear);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case yearString: {
        resultArr.push(year);

        break;
      }

      case smallYearString: {
        resultArr.push(smallYear);

        break;
      }

      case monthString: {
        resultArr.push(month);

        break;
      }

      case dayString: {
        resultArr.push(day);

        break;
      }
    }
  }

  resultDate = resultArr.join(toSep);

  return resultDate;
}

module.exports = formatDate;
