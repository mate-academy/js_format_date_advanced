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
  let year;
  let day;
  let month;
  const separator = fromFormat[3];
  const arrayDate = date.split(separator);
  const newSeparator = toFormat[3];
  const newDate = ['', '', ''];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY' :
        year = arrayDate[i];
        break;

      case 'YY' :
        if (arrayDate[i] < 30) {
          year = `20${arrayDate[i]}`;
        } else {
          year = `19${arrayDate[i]}`;
        }
        break;

      case 'MM' :
        month = arrayDate[i];
        break;

      case 'DD' :
        day = arrayDate[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY' :
        newDate[i] = year;
        break;

      case 'YY' :
        newDate[i] = year.slice(2);
        break;

      case 'MM' :
        newDate[i] = month;
        break;

      case 'DD' :
        newDate[i] = day;
        break;
    }
  }

  return newDate.toString().split(',').join(newSeparator);

  // const newDate = ['', '', ''];
  // let startSlice = 0;
  // const separator = toFormat[3];
  // let year = date.slice(0, 2);

  // for (let i = 0; i < fromFormat.length - 1; i++) {
  //   for (let j = 0; j < toFormat.length - 1; j++) {
  //     if (fromFormat[i] === toFormat[j]) {
  //       newDate[j] += date.slice(startSlice,
  //         fromFormat[i].length + startSlice);
  //       break;
  //     }

  //     if (fromFormat[i].length > toFormat[i].length
  //       && fromFormat[i][0] === toFormat[j][0]) {
  //       newDate[j] += date.slice(startSlice + 2,
  //         fromFormat[i].length + startSlice);
  //       break;
  //     }

  //     if (fromFormat[i].length < toFormat[i].length
  //       && fromFormat[i][0] === toFormat[j][0]) {
  //       if (year < 30) {
  //         year = `20${year}`;
  //       } else {
  //         year = `19${year}`;
  //       }
  //       newDate[j] += year;
  //     }
  //   }

  //   startSlice += fromFormat[i].length + 1;
  // }

  // return newDate.toString().split(',').join(separator);
}

module.exports = formatDate;
