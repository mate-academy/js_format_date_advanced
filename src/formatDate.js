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
  const fromDelimiter = fromFormat[3];
  const fromDateItems = date.split(fromDelimiter);

  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY') {
      dateObject.smallYear = fromDateItems[i];
    }
    else if (fromFormat[i] === 'YYYY') {
      dateObject.largeYear = fromDateItems[i];
    }
    else if (fromFormat[i] === 'DD') {
      dateObject.day = fromDateItems[i];
    }
    else if (fromFormat[i] === 'MM') {
      dateObject.month = fromDateItems[i];
    }
  }

  const toDateItems = [];
  const toDelimiter = toFormat[3];
  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YY') {
      if (!!dateObject.smallYear) {
        toDateItems.push(dateObject.smallYear);
      } else if (!!dateObject.largeYear) {
        toDateItems.push(dateObject.largeYear.slice(-2));
      } 
    } else if (toFormat[i] === 'YYYY') {
      if (!!dateObject.largeYear) {
        toDateItems.push(dateObject.largeYear);
      } else if (!!dateObject.smallYear) {
        const year = Number(dateObject.smallYear) < 30 ? '20' + dateObject.smallYear : '19' + dateObject.smallYear;
        toDateItems.push(year);
      }
    } else if (toFormat[i] === 'DD') {
      toDateItems.push(dateObject.day);
    }
    else if (toFormat[i] === 'MM') {
      toDateItems.push(dateObject.month);
    }
  }

  return toDateItems.join(toDelimiter);
}

module.exports = formatDate;
