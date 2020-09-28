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
  let day, month, year;
  const dateFinal = [];
  const separator = fromFormat.pop();
  const separatorNew = toFormat.pop();
  const dateInput = date.split(separator);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD' :
        day = dateInput[i];
        break;
      case 'MM' :
        month = dateInput[i];
        break;
      case 'YYYY' :
        year = dateInput[i];
        break;
      case 'YY' :
        if (dateInput[i] > 20 && dateInput[i] < 99) {
          year = '19' + dateInput[i];
        } else {
          year = '20' + dateInput[i];
        }
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD' :
        dateFinal.push(day);
        break;
      case 'MM' :
        dateFinal.push(month);
        break;
      case 'YYYY' :
        dateFinal.push(year);
        break;
      case 'YY' :
        dateFinal.push(year.substr(2, 4));
        break;
    }
  }

  return dateFinal.join(separatorNew);
}

module.exports = formatDate;
