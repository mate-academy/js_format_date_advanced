'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];
  const parts = date.split(fromSep);
  const mapping = {};

  for (let i = 0; i < 3; i++) {
    const part = fromFormat[i];

    if (part.includes('Y')) {
      mapping.year = parts[i];
    }

    if (part === 'MM') {
      mapping.month = parts[i];
    }

    if (part === 'DD') {
      mapping.day = parts[i];
    }
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const part = toFormat[i];

    if (part.includes('Y')) {
      let yr = mapping.year;

      if (part === 'YYYY') {
        if (yr.length === 2) {
          yr = Number(yr) < 30 ? '20' + yr : '19' + yr;
        }
      } else if (part === 'YY') {
        if (yr.length === 4) {
          yr = yr.slice(2);
        }
      }
      resultParts.push(yr);
    } else if (part === 'MM') {
      resultParts.push(mapping.month);
    } else if (part === 'DD') {
      resultParts.push(mapping.day);
    }
  }

  return resultParts.join(toSep);
}

module.exports = formatDate;
