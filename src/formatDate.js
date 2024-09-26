'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  let day = 0;
  let month = 0;
  let year = 0;
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const arrayFromDate = date.split(oldSeparator);
  const newDateArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = arrayFromDate[i];
        break;
      case 'MM':
        month = arrayFromDate[i];
        break;
      default:
        year = arrayFromDate[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDateArray.push(day);
    }

    if (toFormat[i] === 'MM') {
      newDateArray.push(month);
    }

    if (toFormat[i] === 'YY') {
      if (year.length > 2) {
        newDateArray.push(year.slice(2));
      } else {
        newDateArray.push(year);
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (year.length === 2 && year >= 30) {
        newDateArray.push(`19${year}`);
      }

      if (year.length === 2 && year < 30) {
        newDateArray.push(`20${year}`);
      }

      if (year.length === 4) {
        newDateArray.push(year);
      }
    }
  }

  return newDateArray.join(newSeparator);
}

module.exports = formatDate;
