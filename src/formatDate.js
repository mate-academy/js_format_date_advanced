'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldFormat = fromFormat;
  const newFormat = toFormat;
  const oldSeparator = oldFormat[3];
  const newSeparator = newFormat[3];
  const oldDate = date.split(oldSeparator);
  const newDate = [];
  let century = '20';

  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      if (oldFormat[j][0] === newFormat[i][0]) {
        if (newFormat[i].length < oldFormat[j].length) {
          newDate.push(oldDate[j].slice(-2));
        } else if (newFormat[i].length > oldFormat[j].length) {
          if (oldDate[j] >= 30) {
            century = '19';
          }
          newDate.push(century + oldDate[j]);
        } else {
          newDate.push(oldDate[j]);
        }
      }
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
