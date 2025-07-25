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

  const parts = [];
  let start = 0;

  for (let i = 0; i <= date.length; i++) {
    if (i === date.length || date[i] === fromSep) {
      parts.push(date.slice(start, i));
      start = i + 1;
    }
  }

  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  function convertYear(yearStr, fromFmt, toFmt) {
    if (fromFmt === toFmt) {
      return yearStr;
    }

    if (fromFmt === 'YYYY' && toFmt === 'YY') {
      return yearStr.slice(-2);
    }

    if (fromFmt === 'YY' && toFmt === 'YYYY') {
      const num = parseInt(yearStr, 10);

      if (num < 30) {
        return '20' + (num < 10 ? '0' + num : num);
      } else {
        return '19' + num;
      }
    }

    return yearStr;
  }

  const outputParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const fmt = toFormat[i];

    if (fmt === 'YY' || fmt === 'YYYY') {
      const fromYearFmt = fromFormat.includes('YYYY') ? 'YYYY' : 'YY';

      outputParts.push(convertYear(dateMap[fromYearFmt], fromYearFmt, fmt));
    } else {
      outputParts.push(dateMap[fmt]);
    }
  }

  return outputParts.join(toSep);
}

module.exports = formatDate;
