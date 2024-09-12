'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormat = [];
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const numbers = date.split(separatorFrom);
  let [year, month, day] = numbers;

  for (let i = 0; i < numbers.length; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = numbers[i];
    }

    if (fromFormat[i] === 'MM') {
      month = numbers[i];
    }

    if (fromFormat[i] === 'DD') {
      day = numbers[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      if (year.length === 2) {
        if (parseInt(year) >= 30) {
          year = '19' + year;
        } else {
          year = '20' + year;
        }
      }
      newFormat.push(year);
    }

    if (toFormat[i] === 'YY') {
      if (year.length === 4) {
        year = year.slice(-2);
      }
      newFormat.push(year);
    }

    if (toFormat[i] === 'MM') {
      newFormat.push(month);
    }

    if (toFormat[i] === 'DD') {
      newFormat.push(day);
    }
  }

  return newFormat.join(separatorTo);
}

module.exports = formatDate;
