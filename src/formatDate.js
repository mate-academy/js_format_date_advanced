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
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dateArray = date.split(separatorFrom);

  // console.log(dateArray);

  const dateObject = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }
  // console.log(dateObject);

  const formattedDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    // console.log(toFormat[i]);
    // const key = toFormat[i]
    let value = dateObject[toFormat[i]];
    // console.log('value', value)
    // console.log('i', key)
    // console.log('v',value)

    if (value === undefined) {
      // console.log('hi')
      if (toFormat[i] === 'YY') {
        // console.log('YES')
        value = dateObject.YYYY.slice(2);
      } else {
        value = +dateObject.YY < 30 ? `20${dateObject.YY}` : `19${dateObject.YY}`;
      }
    }
    // console.log(value)

    // if (key === 'YY') {
    //   if(value.length === 4) {
    //     value = value.slice(2)
    //   } else {
    //     value = +value < 30 ? `20${value}` : `19${value}`;
    //   }
    // }

    formattedDate.push(value);
  }

  return formattedDate.join(separatorTo);
}

module.exports = formatDate;
