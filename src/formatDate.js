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
  const data = {};
  let dateArrey = [];
  const dateResult = [];

  switch (date.length) {
    case 10:
      if (fromFormat[0] === 'YYYY') {
        dateArrey = date.split(date[4]);
        data.year = dateArrey[0];

        if (fromFormat[1] === 'MM') {
          data.month = dateArrey[1];
          data.day = dateArrey[2];
        } else {
          data.month = dateArrey[2];
          data.day = dateArrey[1];
        }
      }

      dateArrey = date.split(date[2]);

      if (fromFormat[2] === 'YYYY') {
        data.year = dateArrey[2];

        if (fromFormat[1] === 'MM') {
          data.month = dateArrey[1];
          data.day = dateArrey[0];
        } else {
          data.month = dateArrey[0];
          data.day = dateArrey[1];
        }
      }

      if (fromFormat[1] === 'YYYY') {
        data.year = dateArrey[1];

        if (fromFormat[0] === 'MM') {
          data.month = dateArrey[0];
          data.day = dateArrey[2];
        } else {
          data.month = dateArrey[2];
          data.day = dateArrey[0];
        }
      }
      break;

    case 8:
      dateArrey = date.split(date[2]);
      data.month = dateArrey[1];

      if (fromFormat[0] === 'YY') {
        if (dateArrey[0] < 30) {
          data.year = '20' + dateArrey[0];
        } else {
          data.year = '19' + dateArrey[0];
        }

        data.day = dateArrey[2];
      } else {
        if (dateArrey[2] < 30) {
          data.year = '20' + dateArrey[2];
        } else {
          data.year = '19' + dateArrey[2];
        }

        data.day = dateArrey[0];
      }
  }

  if (toFormat[0] === 'YYYY') {
    dateResult[0] = data.year;

    if (toFormat[1] === 'MM') {
      dateResult[1] = data.month;
      dateResult[2] = data.day;
    } else {
      dateResult[2] = data.month;
      dateResult[1] = data.day;
    }
  }

  if (toFormat[2] === 'YYYY') {
    dateResult[2] = data.year;

    if (toFormat[1] === 'MM') {
      dateResult[1] = data.month;
      dateResult[0] = data.day;
    } else {
      dateResult[0] = data.month;
      dateResult[1] = data.day;
    }
  }

  if (toFormat[0] === 'YY') {
    dateResult[0] = data.year.slice(2);

    if (toFormat[1] === 'MM') {
      dateResult[1] = data.month;
      dateResult[2] = data.day;
    } else {
      dateResult[2] = data.month;
      dateResult[1] = data.day;
    }
  }

  if (toFormat[2] === 'YY') {
    dateResult[2] = data.year.slice(2);

    if (toFormat[1] === 'MM') {
      dateResult[1] = data.month;
      dateResult[0] = data.day;
    } else {
      dateResult[0] = data.month;
      dateResult[1] = data.day;
    }
  }

  return dateResult.join(toFormat[3]);
}

module.exports = formatDate;
