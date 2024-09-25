'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const oldDate = date.split(oldSeparator);
  const mapOldDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    mapOldDate[fromFormat[i]] = oldDate[i];
  }

  for (const formatItem of toFormat.slice(0, 3)) {
    if (mapOldDate.hasOwnProperty(formatItem)) {
      newDate.push(mapOldDate[formatItem]);
      continue;
    }

    if (formatItem === 'YYYY') {
      newDate.push(
        +mapOldDate['YY'] <= 20
          ? `20${mapOldDate['YY']}`
          : `19${mapOldDate['YY']}`
      );
    } else {
      newDate.push(mapOldDate['YYYY'].slice(2));
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
