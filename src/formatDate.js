'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fullYear = 'YYYY';
  const shortYear = 'YY';

  // find separator in fromFormat arr
  let fromSeparator = '';

  for (const value of fromFormat) {
    if (value.toLowerCase !== value.toUpperCase) {
      fromSeparator = value;
    }
  }

  // split the date by separator in fromFormat arr
  const splittedDate = date.split(fromSeparator);

  // create tempDate and move year to first place, then month, then day
  const tempDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes(fullYear) || fromFormat[i].includes(shortYear)) {
      tempDate[0] = splittedDate[i];
    }

    if (fromFormat[i].includes('MM')) {
      tempDate[1] = splittedDate[i];
    }

    if (fromFormat[i].includes('DD')) {
      tempDate[2] = splittedDate[i];
    }
  }

  // function to convert year from 'YYYY' to 'YY' and vise versa
  const convertYear = function (year) {
    switch (true) {
      case year.toString().length === 2:
        if (year < 30) {
          return `20${year}`;
        } else {
          return `19${year}`;
        }

      case year.toString().length === 4:
        return year % 100;

      default:
        return 'Invalid input';
    }
  };

  // perform year conversion if needed
  if (fromFormat.includes(fullYear) && toFormat.includes(shortYear)) {
    tempDate[0] = convertYear(tempDate[0]);
  }

  if (fromFormat.includes(shortYear) && toFormat.includes(fullYear)) {
    tempDate[0] = convertYear(tempDate[0]);
  }

  // create result date and set on places from toFormat
  const resultDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes(fullYear) || toFormat[i].includes(shortYear)) {
      resultDate[i] = tempDate[0];
    }

    if (toFormat[i].includes('MM')) {
      resultDate[i] = tempDate[1];
    }

    if (toFormat[i].includes('DD')) {
      resultDate[i] = tempDate[2];
    }
  }

  // find separator in toFormat arr
  let toSeparator = '';

  for (const value of toFormat) {
    if (value.toLowerCase !== value.toUpperCase) {
      toSeparator = value;
    }
  }

  // join by separator from toFormat and return
  return resultDate.join(toSeparator);
}

module.exports = formatDate;
