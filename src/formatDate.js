'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatCopy = [...fromFormat];
  const toFormatCopy = [...toFormat];
  const fromSeparator = fromFormatCopy.pop();
  const toSeparator = toFormatCopy.pop();
  const dateParts = date.split(fromSeparator);
  const objFrom = {};
  const arrTo = [];

  for (let i = 0; i < fromFormatCopy.length; i++) {
    objFrom[fromFormatCopy[i]] = dateParts[i];
  }

  for (let i = 0; i < toFormatCopy.length; i++) {
    for (const entry of Object.entries(objFrom)) {
      const twoLettersTo = toFormatCopy[i].slice(0, 2);
      const twoLettersFrom = entry[0].slice(0, 2);

      if (toFormatCopy[i] === entry[0]) {
        arrTo[i] = entry[1];
      } else if (twoLettersTo === twoLettersFrom) {
        if (entry[0].length > toFormatCopy[i].length) {
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
