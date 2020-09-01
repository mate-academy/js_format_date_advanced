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
  const newDateArr = [];
  const oldSep = fromFormat[3];
  const sep = toFormat[3];
  const dateArr = date.split(oldSep);
  const step1 = dateArr[fromFormat.indexOf('YYYY')];
  const step2 = dateArr[fromFormat.indexOf('YY')];
  let year = +(step1 || step2);
  const oldForm = fromFormat;
  const newForm = toFormat;
  let indexYearOld;
  let indexYearNew;
  let yearNew;
  let yearOld;

  if (fromFormat.includes('YY')) {
    yearOld = 2;
  } else if (fromFormat.includes('YYYY')) {
    yearOld = 4;
  }

  if (toFormat.includes('YY')) {
    yearNew = 2;
  } else if (toFormat.includes('YYYY')) {
    yearNew = 4;
  }

  if (yearOld > yearNew) {
    year = year % 100;

    if (year < 10) {
      year = '0' + year;
    }
  } else if (yearOld < yearNew) {
    if (year >= 30) {
      year = 1900 + year;
    } else if (year < 30 && year > 0) {
      year = 2000 + year;
    } else if (year === 0) {
      year = 2000;
    }
  }

  oldForm.pop();
  newForm.pop();

  if (yearNew !== yearOld) {
    if (oldForm.indexOf('YY') > oldForm.indexOf('YYYY')) {
      indexYearOld = oldForm.indexOf('YY');
    } else {
      indexYearOld = oldForm.indexOf('YYYY');
    }

    if (newForm.indexOf('YY') > newForm.indexOf('YYYY')) {
      indexYearNew = newForm.indexOf('YY');
    } else {
      indexYearNew = newForm.indexOf('YYYY');
    }

    newForm[indexYearNew] = oldForm[indexYearOld];
  }

  for (let i = 0; i < oldForm.length; i++) {
    newDateArr[newForm.indexOf(oldForm[i])] = dateArr[i];
  }
  newDateArr[indexYearNew] = year;

  const newDate = newDateArr.join(sep);

  return newDate;
}

module.exports = formatDate;
