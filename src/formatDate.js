'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.at(-1);
  const dateParts = date.split(separator);

  const yearIndex = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');
  let year = dateParts[yearIndex];

  const monthIndex = fromFormat.indexOf('MM');
  const month = dateParts[monthIndex];

  const dayIndex = fromFormat.indexOf('DD');
  const day = dateParts[dayIndex];

  if (year.length === 2) {
    if (Number(year) < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  if (year.length === 4 && toFormat.includes('YY')) {
    year = year.slice(-2);
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      resultParts.push(day);
    }

    if (toFormat[i] === 'MM') {
      resultParts.push(month);
    }

    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      resultParts.push(year);
    }
  }

  const newSeparator = toFormat.at(-1);

  return resultParts.join(newSeparator);
}

module.exports = formatDate;
