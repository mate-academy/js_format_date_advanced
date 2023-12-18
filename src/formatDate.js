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
  const DAY_DESCRIPTION = 'DD';
  const MONTH_DESCRIPTION = 'MM';
  const YEAR_DESCRIPTION = 'YY';
  const FULL_YEAR_DESCRIPTION = 'YYYY';
  const INDEX_OF_DEVIDER = 3;

  const newDevider = toFormat[INDEX_OF_DEVIDER];
  const currentDate = date.split(fromFormat[INDEX_OF_DEVIDER]);
  const currentDay = currentDate[fromFormat.indexOf(DAY_DESCRIPTION)];
  const currentMonth = currentDate[fromFormat.indexOf(MONTH_DESCRIPTION)];
  const currentYear = currentDate[fromFormat.indexOf(YEAR_DESCRIPTION)];
  const currentFullYear
    = currentDate[fromFormat.indexOf(FULL_YEAR_DESCRIPTION)];

  const formatedDate = [];

  for (let i = 0; i < INDEX_OF_DEVIDER; i++) {
    switch (toFormat[i]) {
      case DAY_DESCRIPTION:
        formatedDate[i] = currentDay;

        break;

      case MONTH_DESCRIPTION:
        formatedDate[i] = currentMonth;

        break;

      case YEAR_DESCRIPTION:
        if (currentYear) {
          formatedDate[i] = currentYear;

          break;
        }

        formatedDate[i] = currentFullYear.slice(-2);

        break;

      case FULL_YEAR_DESCRIPTION:
        if (currentYear) {
          if (+currentYear < 30) {
            formatedDate[i] = `20${currentYear}`;

            break;
          }

          formatedDate[i] = `19${currentYear}`;

          break;
        }

        formatedDate[i] = currentFullYear;

        break;

      default:
        break;
    }
  }

  return formatedDate.join(newDevider);
}

module.exports = formatDate;
