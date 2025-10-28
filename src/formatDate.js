'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year = '';
  let yearToFormat = '';
  let months = '';
  let day = '';
  const separateFrom = fromFormat[3];
  const separateTo = toFormat[3];
  const datePart = date.split(separateFrom);

  for (let i = 0; i < datePart.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = datePart[i];
      break;
    }
  }

  for (let i = 0; i < datePart.length; i++) {
    if (fromFormat[i] === 'MM') {
      months = datePart[i];
      break;
    }
  }

  for (let i = 0; i < datePart.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = datePart[i];
      break;
    }
  }

  if (fromFormat.includes('YY')) {
    if (year.length === 2) {
      const yy = Number(year);

      yearToFormat = yy < 30 ? '20' + year : '19' + year;
    } else {
      yearToFormat = year;
    }
  }

  if (toFormat.includes('YY') && year.length === 4) {
    year = year.slice(-2);
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      result.push(year.length === 4 ? year : yearToFormat);
    } else if (toFormat[i] === 'YY') {
      result.push(year.length === 2 ? year : year.slice(-2));
    } else if (toFormat[i] === 'MM') {
      result.push(months);
    } else if (toFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(separateTo);
}

module.exports = formatDate;
