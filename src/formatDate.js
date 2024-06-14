'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateParts = date.split(fromSeparator);
  const objFrom = {};
  const arrTo = [];

  for (let i = 0; i < fromFormat.length; i++) {
    objFrom[fromFormat[i]] = dateParts[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    for (const entry of Object.entries(objFrom)) {
      const twoLettersTo = toFormat[i].slice(0, 2);
      const twoLettersFrom = entry[0].slice(0, 2);

      if (toFormat[i] === entry[0]) {
        arrTo[i] = entry[1];
      } else if (twoLettersTo === twoLettersFrom) {
        if (entry[0].length > toFormat[i].length) {
          arrTo[i] = entry[1].slice(2, 4);
        } else {
          if (+entry[1] < 30) {
            arrTo[i] = '20' + entry[1];
          } else {
            arrTo[i] = '19' + entry[1];
          }
        }
      }
    }
  }

  return arrTo.join(toSeparator);
}

module.exports = formatDate;
