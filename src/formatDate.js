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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const YEAR_SHORT = 'YY';
  const YEAR_LONG = 'YYYY';
  const MONTH = 'MM';
  const DAY = 'DD';
  const newDateFormat = [];

  const actualDate = {
    read() {
      for (let i = 0; i < fromFormat.length - 1; ++i) {
        switch (fromFormat[i]) {
          case YEAR_LONG:
            this.year = date.split(fromSeparator)[i];
            break;

          case YEAR_SHORT:
            this.year = date.split(fromSeparator)[i];
            break;

          case MONTH:
            this.month = date.split(fromSeparator)[i];
            break;

          case DAY:
            this.day = date.split(fromSeparator)[i];
        }
      }
    },
  };

  actualDate.read();

  for (let i = 0; i < toFormat.length - 1; ++i) {
    switch (toFormat[i]) {
      case YEAR_LONG:
        newDateFormat.push(changeYearFormat(actualDate.year, YEAR_LONG));
        break;

      case YEAR_SHORT:
        newDateFormat.push(changeYearFormat(actualDate.year, YEAR_SHORT));
        break;

      case MONTH:
        newDateFormat.push(actualDate.month);
        break;

      case DAY:
        newDateFormat.push(actualDate.day);
    }
  }

  return newDateFormat.join(toSeparator);
}

function changeYearFormat(year, toFormat) {
  switch (toFormat) {
    case 'YY': {
      if (year > 1000) {
        return year % 1000 % 100;
      }
      break;
    }

    case 'YYYY': {
      if (year < 1000) {
        if (year % 1000 % 100 < 30) {
          return 2000 + +year;
        } else {
          return 1900 + +year;
        }
      }
      break;
    }
  }

  return year;
}

module.exports = formatDate;
