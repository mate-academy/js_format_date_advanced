'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateEls = date.split(fromFormat[fromFormat.length - 1]);
  const newSeparator = toFormat[toFormat.length - 1];
  const dateObj = {};
  const newDateFormat = [];

  for (let i = 0; i < dateEls.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        dateObj.day = dateEls[i];
        break;
      case 'MM':
        dateObj.month = dateEls[i];
        break;
      case 'YYYY':
        dateObj.year = dateEls[i];
        break;
      case 'YY':
        dateObj.year = dateEls[i] < 30 ? `20${dateEls[i]}` : `19${dateEls[i]}`;
        break;
    }
  }

  for (let i = 0; i < dateEls.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDateFormat.push(dateObj.day);
        break;
      case 'MM':
        newDateFormat.push(dateObj.month);
        break;
      case 'YYYY':
        newDateFormat.push(dateObj.year);
        break;
      case 'YY':
        newDateFormat.push(dateObj.year.slice(-2));
        break;
    }
  }

  return newDateFormat.join(newSeparator);
}

module.exports = formatDate;
