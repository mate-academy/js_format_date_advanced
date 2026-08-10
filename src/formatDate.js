'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(oldSeparator);
  const newDateParts = [];

  let inShortYear, inLongYear, inMonth, inDate;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      inDate = dateParts[i];
    }

    if (fromFormat[i] === 'MM') {
      inMonth = dateParts[i];
    }

    if (fromFormat[i] === 'YY') {
      inShortYear = dateParts[i];
    }

    if (fromFormat[i] === 'YYYY') {
      inLongYear = dateParts[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDateParts.push(inDate);
    }

    if (toFormat[i] === 'MM') {
      newDateParts.push(inMonth);
    }

    if (toFormat[i] === 'YY') {
      if (inShortYear) {
        newDateParts.push(inShortYear);
      } else {
        newDateParts.push(inLongYear.slice(-2));
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (inLongYear) {
        newDateParts.push(inLongYear);
      } else {
        if (inShortYear < 30) {
          newDateParts.push(20 + inShortYear);
        } else {
          newDateParts.push(19 + inShortYear);
        }
      }
    }
  }

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
