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
  const dateSplit = date.split(fromFormat[3]);
  let index;
  let running;

  return toFormat.slice(0, 3).reduce((accumulator, current, i) => {
    index = fromFormat.findIndex(field => current === field);

    if (index !== -1) {
      running = dateSplit[index];
    } else if (current === 'YYYY') { // need to add century to get to YYYY
      const years = dateSplit[fromFormat.indexOf('YY')]; // the date is in YY

      running = years[0] < 3 // addition of century required
        ? '20' + years
        : '19' + years;
    } else if (current === 'YY') { // value is asked in YY format, date has YYYY
      running = dateSplit[fromFormat.indexOf('YYYY')].substring(2);
    }

    return accumulator + running + ((i !== 2)
      ? toFormat[3]
      : '');
  }, '');
}

module.exports = formatDate;
