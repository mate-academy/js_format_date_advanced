'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrFromDate = date.split(fromFormat[3]);
  const newDate = [];
  let oldFormatYear = '';
  let oldYear = 0;
  let newFormatYear = '';
  let indexYear = 0;

  for (let a = 0; a < fromFormat.length; a++) {
    if (fromFormat[a] === 'YYYY') {
      oldFormatYear = fromFormat[a];
      oldYear = arrFromDate[a];
      indexYear = a;
    }
  }

  for (let a = 0; a < fromFormat.length; a++) {
    if (fromFormat[a] === 'YY') {
      oldFormatYear = fromFormat[a];
      oldYear = arrFromDate[a];
      indexYear = a;
    }
  }

  for (let a = 0; a < toFormat.length; a++) {
    if (toFormat[a] === 'YYYY') {
      newFormatYear = toFormat[a];
    }
  }

  for (let a = 0; a < toFormat.length; a++) {
    if (toFormat[a] === 'YY') {
      newFormatYear = toFormat[a];
    }
  }

  if (newFormatYear === 'YYYY' && newFormatYear !== oldFormatYear) {
    if (oldYear < 30) {
      oldYear = +oldYear + 2000;
    } else {
      oldYear = +oldYear + 1900;
    }
  }

  if (newFormatYear === 'YY' && newFormatYear !== oldFormatYear) {
    oldYear.toString();
    oldYear = +(oldYear[2] + oldYear[3]);
  }

  fromFormat[indexYear] = newFormatYear;
  arrFromDate[indexYear] = oldYear;

  for (let i = 0; i < 4; i++) {
    for (let y = 0; y < 4; y++) {
      if (toFormat[i] === fromFormat[y]) {
        if (toFormat[i] === '-' || toFormat[i] === '.' || toFormat[i] === '/') {
          continue;
        }
        newDate.push(arrFromDate[y]);
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
