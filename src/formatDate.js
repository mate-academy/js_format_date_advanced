'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year = ''; // 'YY'
  let yearToFormat = ''; // 'YYYY'
  let month = '';
  let day = '';

  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const dateParts = date.split(separatorFrom);

  // part year
  for (let i = 0; i < dateParts.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dateParts[i];
      break;
    }
  }

  // part month
  for (let i = 0; i < dateParts.length; i++) {
    if (fromFormat[i] === 'MM') {
      month = dateParts[i];
      break;
    }
  }

  // part day
  for (let i = 0; i < dateParts.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateParts[i];
      break;
    }
  }

  // year to format
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

  // main part of the program
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      result.push(year.length === 4 ? year : yearToFormat);
    } else if (toFormat[i] === 'YY') {
      result.push(year.length === 2 ? year : year.slice(-2));
    } else if (toFormat[i] === 'MM') {
      result.push(month);
    } else if (toFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
