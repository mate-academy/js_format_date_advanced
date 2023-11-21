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
  // write code here
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();

  const arrayWithNewFormat = date.split(oldSeparator);
  const newDateArray = [];

  let indexOfOld = -1;
  let indexOfNew = -1;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      indexOfOld = i;
      break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      indexOfNew = i;
      break;
    }
  }

  let indexOfOldMonth = -1;
  let indexOfNewMonth = -1;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'MM') {
      indexOfOldMonth = i;
      break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'MM') {
      indexOfNewMonth = i;
      break;
    }
  }

  if (indexOfOld !== -1 && indexOfNew !== -1) {
    const yearFromOld = arrayWithNewFormat[indexOfOld];

    // 'YY' -> 'YYYY'
    if (fromFormat[indexOfOld] === 'YY' && toFormat[indexOfNew] === 'YYYY') {
      const year = Number(yearFromOld);

      if (year < 30) {
        arrayWithNewFormat[indexOfOld] = '20' + yearFromOld;
      } else {
        arrayWithNewFormat[indexOfOld] = '19' + yearFromOld;
      }
    }

    // 'YYYY' -> 'YY'
    if (fromFormat[indexOfOld] === 'YYYY' && toFormat[indexOfNew] === 'YY') {
      arrayWithNewFormat[indexOfOld] = yearFromOld.slice(2);
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    const index = toFormat.indexOf(toFormat[i]);

    if (index !== -1) {
      newDateArray.push(arrayWithNewFormat[index]);
    }
  }

  const temp = newDateArray[indexOfOld];

  newDateArray[indexOfOld] = newDateArray[indexOfNew];
  newDateArray[indexOfNew] = temp;

  const tempMonth = newDateArray[indexOfOldMonth];

  newDateArray[indexOfOldMonth] = newDateArray[indexOfNewMonth];
  newDateArray[indexOfNewMonth] = tempMonth;

  const newDate = newDateArray.join(newSeparator);

  return newDate;
}

module.exports = formatDate;
