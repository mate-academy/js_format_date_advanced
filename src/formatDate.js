'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_INDEX = 3;
  const fromSep = fromFormat[SEPARATOR_INDEX];
  const toSep = toFormat[SEPARATOR_INDEX];

  const parts = date.split(fromSep);

  const map = {};

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    map[fromFormat[i]] = parts[i];
  }

  let year = map['YYYY'];

  if (!year && map['YY']) {
    const yy = map['YY'];

    year = Number(yy) < 30 ? '20' + yy : '19' + yy;
  }

  const result = [];

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    const part = toFormat[i];

    if (part === 'YYYY') {
      result.push(year);
    } else if (part === 'YY') {
      result.push(year.slice(-2));
    } else {
      result.push(map[part]);
    }
  }

  return result.join(toSep);
}

module.exports = formatDate;
