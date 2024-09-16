'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // function makes YY from YYYY and vice versa
  const switchYearFormat = (currentYear) => {
    if (currentYear.length === 2) {
      return (+currentYear < 30) ? '20' + currentYear : '19' + currentYear;
    }

    return currentYear.slice(2);
  };

  // creating object as storage and array with dates
  const dateObject = {};
  const dateItems = date.split(fromFormat[3]);

  // fill our object with date, month, year separately
  for (let i = 0; i < dateItems.length; i++) {
    dateObject[fromFormat[i]] = dateItems[i];
  }

  // adding another year format to our object
  if (dateObject['YY']) {
    dateObject['YYYY'] = switchYearFormat(dateObject['YY']);
  } else {
    dateObject['YY'] = switchYearFormat(dateObject['YYYY']);
  }

  // create resulting array
  const newDate = [];

  // fill our resulting array with dates in right order
  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(dateObject[toFormat[i]]);
  }

  // return joined string with separator from toFormat
  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
