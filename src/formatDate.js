'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatSeparator = fromFormat[3];
  const toFormatSeparator = toFormat[3];
  const dateFromParts = date.split(fromFormatSeparator);
  const formatingFrom = {};
  const dateToParts = [];

  formatingFrom[fromFormat[0]] = dateFromParts[0];
  formatingFrom[fromFormat[1]] = dateFromParts[1];
  formatingFrom[fromFormat[2]] = dateFromParts[2];

  for (let i = 0; i < 3; i++) {
    for (const key in formatingFrom) {
      if (key.includes(toFormat[i][0])) {
        const needLength = toFormat[i].length;
        const isLength = formatingFrom[key].length;
        let newPartDate = formatingFrom[key];

        if (isLength !== needLength && key.includes('Y')) {
          if (needLength === 2) {
            newPartDate = formatingFrom[key].slice(2, 4);
          } else {
            newPartDate = (newPartDate < 30 ? '20' : '19') + newPartDate;
          }
        }
        dateToParts.push(newPartDate);
      }
    }
  }

  return dateToParts.join(toFormatSeparator);
}

module.exports = formatDate;
