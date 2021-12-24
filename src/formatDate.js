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
  const dateFromFormat = date.split(`${fromFormat[3]}`);
  // console.log('dateFromFormat = ', dateFromFormat);

  const dateToFormat = toFormat.map((item) => {
    // console.log('item = ', item);
    // console.log('index item from', fromFormat.indexOf(item));
    // console.log('index item to ', toFormat.indexOf(item));

    if (item.includes('Y')) {
      if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
        // console.log(
        // 'index of YYYY in fromFormat',
        // fromFormat.indexOf('YYYY')
        // );
        // console.log('index of YY in toFormat', toFormat.indexOf('YY'));
        // console.log(
        //   'YYYY => YY',
        //   dateFromFormat[fromFormat.indexOf('YYYY')].slice(2)
        // );

        return dateFromFormat[fromFormat.indexOf('YYYY')].slice(2);
      }

      if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
        // console.log('index of YY in fromFormat', fromFormat.indexOf('YY'));
        // console.log('index of YYYY in toFormat', toFormat.indexOf('YYYY'));
        // console.log('YY => YYYY ', dateFromFormat[fromFormat.indexOf('YY')]);
        if (dateFromFormat[fromFormat.indexOf('YY')] >= 30) {
          return '19' + dateFromFormat[fromFormat.indexOf('YY')];
        } else {
          return '20' + dateFromFormat[fromFormat.indexOf('YY')];
        }
      }

      // console.log(dateFromFormat[fromFormat.indexOf(item)]);
      return dateFromFormat[fromFormat.indexOf(item)];
    }

    return dateFromFormat[fromFormat.indexOf(item)];
  });

  dateToFormat.length = 3;
  // console.log('dateToFormat = ', dateToFormat);
  // console.log(dateToFormat.join(`${fromFormat[3]}`));

  return dateToFormat.join(`${toFormat[3]}`);
}

module.exports = formatDate;
