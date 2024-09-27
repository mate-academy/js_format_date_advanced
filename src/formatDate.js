'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arr = [];
  const arrSplit = date.split(fromFormat.pop());
  const arrToFormat = toFormat.pop();
  let year,
    month,
    day;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY') {
      if (+arrSplit[i] < 30) {
        year = `20${arrSplit[i]}`;
      } else {
        year = `19${arrSplit[i]}`;
      }
    }

    if (fromFormat[i] === 'YYYY') {
      year = arrSplit[i];
    }

    if (fromFormat[i] === 'MM') {
      month = arrSplit[i];
    }

    if (fromFormat[i] === 'DD') {
      day = arrSplit[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY') {
      arr[i] = year.slice(2);
    } else {
      arr[i] = year;
    }

    if (toFormat[i] === 'MM') {
      arr[i] = month;
    }

    if (toFormat[i] === 'DD') {
      arr[i] = day;
    }
  }

  return arr.join(arrToFormat);
}

module.exports = formatDate;
