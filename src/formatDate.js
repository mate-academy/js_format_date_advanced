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
  let newDate = [];
  const dateArray = date.split(fromFormat[3]);
  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  for (let i = 0; i < 3; i++) {
    const oldFormat = fromFormat[i];
    const index = toFormat.indexOf(oldFormat);

    if (index === -1) {
      if (oldFormat === 'YY') {
        dateObject['YYYY'] = +dateArray[i] < 30
          ? 20 + dateArray[i]
          : 19 + dateArray[i];
      }

      if (oldFormat === 'YYYY') {
        dateObject['YY'] = dateArray[i].slice(2);
      }
    }

    newDate.push(dateObject[toFormat[i]]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
