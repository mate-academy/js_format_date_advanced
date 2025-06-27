'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];
  const dates = date.split(fromSep);

  const formatMap = {};

  for (let i = 0; i < dates.length; i++) {
    const part = fromFormat[i];
    const value = dates[i];

    formatMap[part] = value;

    if (part === 'YYYY') {
      formatMap['YY'] = value.slice(2);
    }

    if (part === 'YY') {
      const num = +value;

      formatMap['YYYY'] = (num < 30 ? '20' : '19') + value;
    }
  }

  const result = [];

  const [a, b, c] = toFormat;

  result.push(formatMap[a], formatMap[b], formatMap[c]);

  return result.join(toSep);
}

module.exports = formatDate;
