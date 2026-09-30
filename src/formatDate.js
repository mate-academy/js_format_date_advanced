'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateTableSplit = date.split(fromFormat[fromFormat.length - 1]);
  let year = null;
  let month = null;
  let day = null;
  const finalString = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = dateTableSplit[i];
    }

    if (fromFormat[i] === 'YY') {
      year = dateTableSplit[i].split('').slice(-2);
    }

    if (fromFormat[i] === 'MM') {
      month = dateTableSplit[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateTableSplit[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      if (year.length !== 4) {
        if (+year <= 30 || year === '00') {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
      }
      finalString.push(year);
    }

    if (toFormat[i] === 'YY') {
      if (year.length !== 2) {
        year = year.slice(-2);
        finalString.push(year);
      }
    }

    if (toFormat[i] === 'MM') {
      finalString.push(month);
    }

    if (toFormat[i] === 'DD') {
      finalString.push(day);
    }
  }

  return finalString.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
