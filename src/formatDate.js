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
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];
  const dateMap = date.split(fromSep);
  const toParts = toFormat.slice(0, -1);
  const result = [];

  for (const part of toParts) {
    let partValue;

    if (part.includes('Y')) {
      const i = fromFormat.includes('YYYY')
        ? fromFormat.indexOf('YYYY')
        : fromFormat.indexOf('YY');
      const yearLength = part.length;

      partValue = dateMap[i];

      if (yearLength > partValue.length) {
        partValue = partValue >= 30 ? '19' + partValue : '20' + partValue;
      }

      if (yearLength < partValue.length) {
        partValue = partValue.slice(-2);
      }
    } else {
      const i = fromFormat.indexOf(part);

      partValue = dateMap[i];
    }

    result.push(partValue);
  }

  return result.join(toSep);
}

module.exports = formatDate;
