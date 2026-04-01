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
  const dateParts = date.split(fromSeparator);

  let day = '';
  let month = '';
  let year = '';
  let fromYearFormat = '';
  let toYearFormat = '';

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateParts[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateParts[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = dateParts[i];
      fromYearFormat = fromFormat[i];
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      toYearFormat = toFormat[i];
    }
  }

  if (fromYearFormat === 'YYYY' && toYearFormat === 'YY') {
    year = year.slice(2);
  }

  if (fromYearFormat === 'YY' && toYearFormat === 'YYYY') {
    year = Number(year) < 30 ? `20${year}` : `19${year}`;
  }

  let firstPart = '';
  let secondPart = '';
  let thirdPart = '';

  for (let i = 0; i < 3; i++) {
    let value = '';

    if (toFormat[i] === 'DD') {
      value = day;
    }

    if (toFormat[i] === 'MM') {
      value = month;
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      value = year;
    }

    if (i === 0) {
      firstPart = value;
    }

    if (i === 1) {
      secondPart = value;
    }

    if (i === 2) {
      thirdPart = value;
    }
  }

  return `${firstPart}${toSeparator}${secondPart}${toSeparator}${thirdPart}`;
}

module.exports = formatDate;
