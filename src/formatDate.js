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
  const century19 = 19;
  const century20 = 20;
  const century30 = 30;
  const codeDay = 'DD';
  const codeMonth = 'MM';
  const codeYear = 'YYYY';
  const shortCodeYear = 'YY';
  const connectorOld = fromFormat.slice(-1);
  const dateCodeOld = fromFormat.slice(0, -1);
  const connectorNew = toFormat.slice(-1);
  const dateCodeNew = toFormat.slice(0, -1);
  const dateArr = date.split(connectorOld);
  const dateOld = {};

  for (let i = 0; i < dateCodeOld.length; i++) {
    dateOld[dateCodeOld[i]] = dateArr[i];
  }

  if (dateOld.hasOwnProperty(shortCodeYear)) {
    if (+dateOld.YY < century30) {
      dateOld.YYYY = century20 + dateOld.YY;
    } else {
      dateOld.YYYY = century19 + dateOld.YY;
    }
  } else {
    dateOld.YY = dateOld.YYYY.slice(-2);
  }

  for (let k = 0; k < dateCodeNew.length; k++) {
    switch (dateCodeNew[k]) {
      case codeDay:
        dateCodeNew[k] = dateOld.DD;
        break;
      case codeMonth:
        dateCodeNew[k] = dateOld.MM;
        break;
      case shortCodeYear:
        dateCodeNew[k] = dateOld.YY;
        break;
      case codeYear:
        dateCodeNew[k] = dateOld.YYYY;
        break;
    }
  }

  return dateCodeNew.join(connectorNew);
}

module.exports = formatDate;
