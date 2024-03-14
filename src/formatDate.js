'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  const reorderedParts = [];

  fromFormat.slice(0, -1).forEach((parameter, oldIndex) => {
    let part = parts[oldIndex];
    let newIndex = toFormat.indexOf(parameter);

    if (newIndex === -1) {
      if (parameter === 'YYYY') {
        part = part.slice(2);
        newIndex = toFormat.indexOf('YY');
      } else {
        if (parseInt(part) < 30) {
          part = '20' + part;
        } else {
          part = '19' + part;
        }

        newIndex = toFormat.indexOf('YYYY');
      }
    }

    reorderedParts[newIndex] = part;
  });

  return reorderedParts.join(toFormat[3]);
}

module.exports = formatDate;
