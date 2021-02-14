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
  const fromDate = date.split(fromFormat[3]);
  const toDate = Array(3).fill(1);
  const toDayIndex = toFormat.indexOf('DD');
  const fromDayIndex = fromFormat.indexOf('DD');
  const toMounthIndex = toFormat.indexOf('MM');
  const fromMounthIndex = fromFormat.indexOf('MM');

  for (let i = 0; i < fromDate.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        toDate[toDayIndex] = fromDate[fromDayIndex];
        break;

      case 'MM':
        toDate[toMounthIndex] = fromDate[fromMounthIndex];
        break;

      case 'YY':
      case 'YYYY':

        if (fromFormat.includes('YY')) {
          const fromYearIndex = fromFormat.indexOf('YY');
          const toYearIndex = toFormat.indexOf('YY');

          if (toFormat.includes('YYYY')) {
            const toYearIndexBig = toFormat.indexOf('YYYY');

            if (fromDate[fromYearIndex] < 30
                  || fromDate[fromYearIndex] === '00') {
              const bigYear = '20' + `${fromDate[fromYearIndex]}`;

              toDate[toYearIndexBig] = `${bigYear}`;
            } else {
              const bigYear = '19' + `${fromDate[fromYearIndex]}`;

              toDate[toYearIndexBig] = `${bigYear}`;
            }
          } else {
            toDate[toYearIndex] = `${fromDate[fromYearIndex]}`;
          }
        }

        if (fromFormat.includes('YYYY')) {
          const fromYearIndex = fromFormat.indexOf('YYYY');
          const toYearIndex = toFormat.indexOf('YYYY');

          if (toFormat.includes('YY')) {
            const toYearIndexSmall = toFormat.indexOf('YY');

            toDate[toYearIndexSmall] = `${fromDate[fromYearIndex].slice(2)}`;
          } else {
            toDate[toYearIndex] = `${fromDate[fromYearIndex]}`;
          }
        }
        break;
    }
  }

  const newDate = toDate.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
