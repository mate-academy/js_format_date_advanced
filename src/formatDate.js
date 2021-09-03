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
  const dateArr = date.split(fromFormat[3]);
  let resultDate;
  let longYear;
  const resultArr = [];
  const yearMinOld = fromFormat.indexOf('YY');
  const yearMinNew = toFormat.indexOf('YY');
  const yearMaxOld = fromFormat.indexOf('YYYY');
  const yearMaxNew = toFormat.indexOf('YYYY');
  const dayOld = fromFormat.indexOf('DD');
  const dayNew = toFormat.indexOf('DD');
  const monthOld = fromFormat.indexOf('MM');
  const monthNew = toFormat.indexOf('MM');

  if (yearMinOld >= 0 & yearMinNew >= 0) {
    if (yearMinOld !== yearMinNew) {
      resultArr[dayNew] = dateArr[dayOld];
      resultArr[monthNew] = dateArr[monthOld];
      resultArr[yearMinNew] = dateArr[yearMinOld];
      resultDate = resultArr.join(toFormat[3]);
    } else {
      resultDate = dateArr.join(toFormat[3]);
    }
  } else if (yearMaxOld >= 0 & yearMaxNew >= 0) {
    if (yearMaxOld !== yearMaxNew) {
      resultArr[dayNew] = dateArr[dayOld];
      resultArr[monthNew] = dateArr[monthOld];
      resultArr[yearMaxNew] = dateArr[yearMaxOld];
      resultDate = resultArr.join(toFormat[3]);
    } else {
      resultDate = dateArr.join(toFormat[3]);
    }
  } else if (yearMinNew >= 0 & yearMaxOld >= 0) {
    dateArr[yearMaxOld] = dateArr[yearMaxOld].slice(2, 5);

    if (yearMinNew !== yearMaxOld) {
      resultArr[dayNew] = dateArr[dayOld];
      resultArr[monthNew] = dateArr[monthOld];
      resultArr[yearMinNew] = dateArr[yearMaxOld];
      resultDate = resultArr.join(toFormat[3]);
    } else {
      resultDate = dateArr.join(toFormat[3]);
    }
  } else if (yearMaxNew >= 0 & yearMinOld >= 0) {
    if (dateArr[yearMinOld] < 30) {
      longYear = `20${dateArr[yearMinOld]}`;
    } else {
      longYear = `19${dateArr[yearMinOld]}`;
    }

    if (yearMaxNew !== yearMinOld) {
      resultArr[dayNew] = dateArr[dayOld];
      resultArr[monthNew] = dateArr[monthOld];
      resultArr[yearMaxNew] = longYear;
      resultDate = resultArr.join(toFormat[3]);
    } else {
      dateArr[yearMaxNew] = longYear;
      resultDate = dateArr.join(toFormat[3]);
    }
  }

  return resultDate;
}

module.exports = formatDate;
