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

  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < 3; i++) {
    const type = fromFormat[i];
    const value = parts[i];

    if (type === 'DD') {
      day = value;
    } else if (type === 'MM') {
      month = value;
    } else if (type === 'YYYY') {
      year = value;
    } else if (type === 'YY') {
      year = (Number(value) < 30 ? '20' : '19') + value;
    }
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const type = toFormat[i];

    if (type === 'DD') {
      resultParts.push(day);
    } else if (type === 'MM') {
      resultParts.push(month);
    } else if (type === 'YYYY') {
      resultParts.push(year);
    } else if (type === 'YY') {
      resultParts.push(year.slice(-2));
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
