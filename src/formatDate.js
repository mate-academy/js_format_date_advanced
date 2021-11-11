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
  // transformation of str into array
  const newDate = date.split(fromFormat[3]);
  let day = '';
  let month = '';
  let year = '';
  const newFormat = [];

  const objData = {};

  for (let i = 0; i < fromFormat.length; i++) {
    // assign correct index and value to the object key
    if (fromFormat[i] === 'DD') {
      objData['DD'] = newDate[i];
    }

    if (fromFormat[i] === 'MM') {
      objData['MM'] = newDate[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      objData['YY'] = newDate[i];
    }
  }

  // if YYYY is reduced to YY
  if (fromFormat[2][0]
    === toFormat[2][0]
    && fromFormat[2].length
    !== toFormat[2].length) {
    year = newDate[2].slice(2);

    newDate[2] = year;

    return newDate.join(toFormat[3]);
  }

  // when only separator is changed
  if (fromFormat.join(fromFormat[3]).substr(0, 3)
  === toFormat.join(toFormat[3]).substr(0, 3)) {
    return Object.values(objData).join(toFormat[3]);
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      day += objData.DD;
      objData.DD = day;
      newFormat.push(objData.DD);
    }

    if (toFormat[i] === 'MM') {
      month += objData.MM;
      objData.MM = month;
      newFormat.push(objData.MM);
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      year += objData.YY;
      objData.YY = year;
      newFormat.push(objData.YY);
    }
  }

  // add 20 or 19 to the year
  if (fromFormat[0][0]
    === toFormat[0][0]
    && fromFormat[0].length
    !== toFormat[0].length) {
    if (+newDate[0] >= 30) {
      newDate[0] = '19' + newDate[0];

      return newDate.join(toFormat[3]);
    }

    if (+newDate[0].slice(2) < 30) {
      newDate[0] = '20' + newDate[0];

      return newDate.join(toFormat[3]);
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
