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
  const dayDescription = 'DD';
  const monthDescription = 'MM';
  const yearDescription = 'YY';
  const fullYearDescription = 'YYYY';

  const indexOfDevider = 3;
  const newDevider = toFormat[indexOfDevider];
  const currentDate = date.split(fromFormat[indexOfDevider]);
  const currentDay = currentDate[fromFormat.indexOf(dayDescription)];
  const currentMonth = currentDate[fromFormat.indexOf(monthDescription)];
  const currentYear = currentDate[fromFormat.indexOf(yearDescription)];
  const currentFullYear = currentDate[fromFormat.indexOf(fullYearDescription)];

  const formatedDate = [];

  for (let i = 0; i < indexOfDevider; i++) {
    switch (toFormat[i]) {
      case dayDescription:
        formatedDate[i] = currentDay;

        break;

      case monthDescription:
        formatedDate[i] = currentMonth;

        break;

      case yearDescription:
        if (currentYear) {
          formatedDate[i] = currentYear;

          break;
        }

        formatedDate[i] = currentFullYear.slice(-2);

        break;

      case fullYearDescription:
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
