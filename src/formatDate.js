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
  const SEPARATOR_INDEX = 3;
  const DAYS_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const SHORT_YEAR_FORMAT_LENGTH = 2;

  const partsOfDate = date.split(fromFormat[SEPARATOR_INDEX]);
  const resultArray = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].startsWith('Y')) {
      const indexOfYear = fromFormat.findIndex((str) => str.startsWith('Y'));
      const yearFromDate = partsOfDate[indexOfYear];

      const differencesFormats =
        toFormat[i].length - fromFormat[indexOfYear].length;

      switch (differencesFormats) {
        case -2: {
          resultArray[i] = yearFromDate.slice(SHORT_YEAR_FORMAT_LENGTH);
          break;
        }

        case 2: {
          const resultYear =
            +yearFromDate < 30 ? 20 + yearFromDate : 19 + yearFromDate;

          resultArray[i] = resultYear;
          break;
        }

        default: {
          resultArray[i] = yearFromDate;
        }
      }
    }

    if (toFormat[i].startsWith('M')) {
      const monthFromDate = partsOfDate[fromFormat.indexOf(MONTH_FORMAT)];

      resultArray[i] = monthFromDate;
    }

    if (toFormat[i].startsWith('D')) {
      const daysFromDate = partsOfDate[fromFormat.indexOf(DAYS_FORMAT)];

      resultArray[i] = daysFromDate;
    }
  }

  return resultArray.join(toFormat[SEPARATOR_INDEX]);
}

module.exports = formatDate;
