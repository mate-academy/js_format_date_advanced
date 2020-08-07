'use strict';

/**
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // removes all non-digit elements from "date" string
  const dateWithoutSeparator = date.replace(/\D/g, ' ');

  const separator = toFormat[3];
  // transform "date" string to array
  const formattedDate = dateWithoutSeparator.split(' ');

  // checks if toFormat date year length is 2
  if (toFormat[2].length === 2) {
    for (let i = 0; i < formattedDate.length; i++) {
      // this check is required to not to splice day or month
      if (formattedDate[i].length > toFormat[2].length) {
        // removes two last digits from year
        formattedDate[i] = formattedDate[i].split('').splice(-2, 2).join('');
      }
    }
  }

  // checks if fromFormat day and month position matches toFormat date format
  if (fromFormat[0] !== toFormat[0]) {
    // changes day and month position
    [formattedDate[0], formattedDate[1]] = [formattedDate[1], formattedDate[0]];
  }

  // check if year is at the beginning of the fromFormat date format
  if (fromFormat[0].includes('YY')) {
    // if yes, I reverse formattedDate array and join the array with separator
    return formattedDate.reverse().join(`${separator}`);
  }

  // join the array with separator
  return formattedDate.join(`${separator}`);
}

module.exports = formatDate;
