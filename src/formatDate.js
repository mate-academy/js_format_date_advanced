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
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateFrom = date.split(fromSeparator);
  const dateTo = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (i === toFormat.indexOf('DD')) {
      dateTo.push(dateFrom[fromFormat.indexOf('DD')]);
    }

    if (i === toFormat.indexOf('MM')) {
      dateTo.push(dateFrom[fromFormat.indexOf('MM')]);
    }

    if (i === toFormat.indexOf('YYYY')) {
      if (fromFormat.includes('YYYY')) {
        dateTo.push(dateFrom[fromFormat.indexOf('YYYY')]);
      } else if (fromFormat.includes('YY')) {
        const year = dateFrom[fromFormat.indexOf('YY')];

        if (year < 30) {
          dateTo.push(`20${year}`);
        } else {
          dateTo.push(`19${year}`);
        }
      }
    }

    if (i === toFormat.indexOf('YY')) {
      if (fromFormat.includes('YY')) {
        dateTo.push(dateFrom[fromFormat.indexOf('YY')]);
      } else if (fromFormat.includes('YYYY')) {
        dateTo.push(dateFrom[fromFormat.indexOf('YYYY')].slice(-2));
      }
    }
  }

  return (dateTo.join(toSeparator));
}

module.exports = formatDate;
