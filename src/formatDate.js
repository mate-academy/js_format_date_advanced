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
  const dateAfterFormatting = [];

  const PEAK_YEAR_IN_TWENTY_FIRST = 30;
  const TWENTY_FIRST_CENTURY = '20';
  const TWENTIETH_CENTURY = '19';
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateComponent = date.split(oldSeparator);

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        dateAfterFormatting[i]
        = dateComponent[fromFormat.indexOf('DD')];
        break;

      case 'MM':
        dateAfterFormatting[i]
        = dateComponent[fromFormat.indexOf('MM')];
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          dateAfterFormatting[i] = dateComponent[fromFormat.indexOf('YY')];
        } else {
          dateAfterFormatting[i]
        = dateComponent[fromFormat.indexOf('YYYY')].split('').slice(2).join('');
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          dateAfterFormatting[i] = dateComponent[fromFormat.indexOf('YYYY')];
        } else {
          if (
            dateComponent[fromFormat.indexOf('YY')] >= PEAK_YEAR_IN_TWENTY_FIRST
          ) {
            dateAfterFormatting[i]
            = TWENTIETH_CENTURY + dateComponent[fromFormat.indexOf('YY')];
          }

          if (
            dateComponent[fromFormat.indexOf('YY')] < PEAK_YEAR_IN_TWENTY_FIRST
          ) {
            dateAfterFormatting[i]
            = TWENTY_FIRST_CENTURY + dateComponent[fromFormat.indexOf('YY')];
          }
        }
    }
  }

  return dateAfterFormatting.join(newSeparator);
}

module.exports = formatDate;
