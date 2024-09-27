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
  const inputDate = date.split(fromFormat[fromFormat.length - 1]);
  const currentCentury = 20;
  const previousCentury = 19;
  const corrDate = [];

  for (let i = 0; i < inputDate.length; i++) {
    for (let j = 0; j < inputDate.length; j++) {
      if ((toFormat[i].charAt(0) === fromFormat[j].charAt(0))) {
        if (toFormat[i].length === fromFormat[j].length) {
          corrDate.push(inputDate[j]);
        } else {
          if (toFormat[i].length > fromFormat[j].length) {
            if (inputDate[j] >= 30) {
              corrDate.push(previousCentury + inputDate[j]);
            } else {
              corrDate.push(currentCentury + inputDate[j]);
            }
          } else {
            corrDate.push(inputDate[j].slice(2));
          }
        }
      }
    }
  }

  return corrDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
