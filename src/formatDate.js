'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.slice(-1);
  const newSeparator = toFormat.slice(-1);
  const oldDate = date.split(oldSeparator);
  const newFormatDate = [];
  const dateObject = {};

  // Convert the array to an object, it will simplify the
  // movement of dates according to the new format.
  for (let i = 0; i < oldDate.length; i++) {
    dateObject[fromFormat[i]] = oldDate[i];
  }

  // I check whether the object has a year in 'YYYY' format
  // and add it in 'YY' format if the new format requires it.
  if (fromFormat.includes('YYYY')) {
    dateObject.YY = dateObject.YYYY.slice(2);
  }

  // In the second check, I do the same as in the first, but I also
  // check to determine which year to enter.
  if (dateObject.YY < 30) {
    dateObject.YYYY = 20 + dateObject.YY;
  } else if (dateObject.YY >= 30) {
    dateObject.YYYY = 19 + dateObject.YY;
  }

  // Using a loop to place dates in the new format.
  for (let n = 0; n < toFormat.length - 1; n++) {
    newFormatDate.push(dateObject[toFormat[n]]);
  }

  return newFormatDate.join(newSeparator);
}

module.exports = formatDate;
