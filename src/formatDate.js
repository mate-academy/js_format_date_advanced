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
  let DDfrom = 0;
  let MMfrom = 0;
  let DDto = 0;
  let MMto = 0;
  const sep = toFormat[3];
  const interimObject = {};
  const lastArray = [];
  const dateArray = date.split(fromFormat[3]);

  for (let iFrom = 0; iFrom < fromFormat.length - 1; iFrom++) {
    for (let iTo = 0; iTo < toFormat.length - 1; iTo++) {
      if (fromFormat[iFrom] === toFormat[iTo] && fromFormat[iFrom] === 'DD') {
        DDfrom = iFrom;
        DDto = iTo;
      }

      if (fromFormat[iFrom] === toFormat[iTo] && fromFormat[iFrom] === 'MM') {
        MMfrom = iFrom;
        MMto = iTo;
      }
    }
  }

  const yearFrom = 3 - DDfrom - MMfrom;
  const yearTo = 3 - DDto - MMto;

  if (fromFormat[yearFrom].length > toFormat[yearTo].length) {
    dateArray[yearFrom] = `${+dateArray[yearFrom] % 100}`;
  }

  if (fromFormat[yearFrom].length < toFormat[yearTo].length) {
    if (+dateArray[yearFrom] < 30) {
      dateArray[yearFrom] = '20' + dateArray[yearFrom];
    } else {
      dateArray[yearFrom] = '19' + dateArray[yearFrom];
    }
  }

  interimObject[DDto] = dateArray[DDfrom];
  interimObject[MMto] = dateArray[MMfrom];
  interimObject[yearTo] = dateArray[yearFrom];

  for (const i in interimObject) {
    if (i === '0') {
      lastArray.push(interimObject[i]);
    }

    if (i === '1') {
      lastArray.push(interimObject[i]);
    }

    if (i === '2') {
      lastArray.push(interimObject[i]);
    }
  }

  return lastArray.join(sep);
}

module.exports = formatDate;
