'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const dateSplit = date.split(oldSeparator);
  const newSeparator = toFormat[toFormat.length - 1];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let n = 0; n < fromFormat.length - 1; n++) {
      if (toFormat[i] === fromFormat[n]) {
        result.push(dateSplit[n]);
        continue;
      }

      if (toFormat[i] === fromFormat[n].slice(2)) {
        result.push(dateSplit[n].slice(2));
      }

      if (toFormat[i].slice(2) === fromFormat[n]) {
        switch (dateSplit[n] > 30) {
          case true:
            result.push(`19${dateSplit[n]}`);
            break;

          default:
            result.push(`20${dateSplit[n]}`);
        }
      }
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
