'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const MAX = 30;

function createObjectOriginalFormat(dateSplit, fromFormat) {
  const matchOriginalFormat = {};
  let idx = 0;

  for (const number of dateSplit) {
    matchOriginalFormat[number] = fromFormat[idx];
    idx++;
  }

  return matchOriginalFormat;
}

function formatDate(date, fromFormat, toFormat) {
  const originalSeparator = fromFormat[fromFormat.length - 1];
  const dateSplit = date.split(originalSeparator);
  const matchFormat = createObjectOriginalFormat(dateSplit, fromFormat);
  const newFormat = [];
  let idx = 0;

  while (idx < toFormat.length - 1) {
    const currentFormat = toFormat[idx];

    for (const entries of Object.entries(matchFormat)) {
      const key = entries[0];
      const value = entries[1];

      if (currentFormat === 'YY' && value === 'YYYY') {
        newFormat.push(key.slice(2));
      }

      if (value === 'YY' && currentFormat === 'YYYY') {
        if (Number(key) < MAX) {
          newFormat.push(`20${key}`);
        }

        if (Number(key) >= MAX) {
          newFormat.push(`19${key}`);
        }
      }

      if (value === currentFormat) {
        newFormat.push(key);
      }
    }

    idx++;
  }

  return newFormat.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
