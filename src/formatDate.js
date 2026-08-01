'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const yearIndex = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');
  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const parts = date.split(fromSeparator);
  const result = [];

  const day = parts[dayIndex];
  const month = parts[monthIndex];
  let year = parts[yearIndex];

  if (year && year.length === 2) {
    if (Number(year) < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];

    if (key === 'YY') {
      result.push(year.slice(-2));
    }

    if (key === 'YYYY') {
      result.push(year);
    }

    if (key === 'MM') {
      result.push(month);
    }

    if (key === 'DD') {
      result.push(day);
    }
  }

  return result.join(toSeparator);
}
module.exports = formatDate;
