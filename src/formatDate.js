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
  const dateArray = date.split(fromFormat[3]);
  let fromYear = '';
  let fromMonth = '';
  let fromDay = '';
  const toArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      fromYear = dateArray[i];
    } else if (fromFormat[i] === 'MM') {
      fromMonth = dateArray[i];
    } else if (fromFormat[i] === 'DD') {
      fromDay = dateArray[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      if (fromYear.length === 4 && toFormat[i].length === 2) {
        toArray[i] = fromYear.slice(2);
      } else if (fromYear.length === 2 && toFormat[i].length === 4) {
        if (Number(fromYear) < 30) {
          toArray[i] = '20' + fromYear;
        } else {
          toArray[i] = '19' + fromYear;
        }
      } else {
        toArray[i] = fromYear;
      }
    } else if (toFormat[i] === 'MM') {
      toArray[i] = fromMonth;
    } else if (toFormat[i] === 'DD') {
      toArray[i] = fromDay;
    }
  }

  const result = toArray.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
