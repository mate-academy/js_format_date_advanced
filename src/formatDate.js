'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const parts = date.split(fromSeparator);
  const values = [];
  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < 3; i++) {
    const type = fromFormat[i];

    if (type === 'YYYY') {
      year = parts[i];
    } else if (type === 'YY') {
      const yy = parts[i];

      year = parseInt(yy, 10) < 30 ? '20' + yy : '19' + yy;
    } else if (type === 'MM') {
      month = parts[i];
    } else if (type === 'DD') {
      day = parts[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    const type = toFormat[i];

    if (type === 'YYYY') {
      values.push(year);
    } else if (type === 'YY') {
      values.push(year.slice(-2));
    } else if (type === 'MM') {
      values.push(month);
    } else if (type === 'DD') {
      values.push(day);
    }
  }

  return values.join(toSeparator);
}

module.exports = formatDate;
