'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];

  const mappedDate = {};

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      mappedDate['YY'] = separator[i].slice(2);
    } else if (fromFormat[i] === 'YY') {
      const year = +separator[i] < 30
        ? 20 + separator[i]
        : 19 + separator[i];

      mappedDate['YYYY'] = year;
    }
    mappedDate[fromFormat[i]] = separator[i];
  }

  for (let part = 0; part < toFormat.length - 1; part++) {
    newDate.push(mappedDate[toFormat[part]]);
  }

  const joiner = toFormat[toFormat.length - 1];

  return newDate.join(joiner);
}

module.exports = formatDate;
