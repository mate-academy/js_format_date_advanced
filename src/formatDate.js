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

  let day, month, year;

  for (let i = 0; i < 3; i++) {
    const formatPart = fromFormat[i];
    const value = dateParts[i];

    if (formatPart === 'DD') {
      day = value;
    } else if (formatPart === 'MM') {
      month = value;
    } else if (formatPart === 'YY' || formatPart === 'YYYY') {
      year = value;
    }
  }

  if (year.length === 2) {
    if (Number(year) < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const targetPart = toFormat[i];

    if (targetPart === 'DD') {
      resultParts.push(day);
    } else if (targetPart === 'MM') {
      resultParts.push(month);
    } else if (targetPart === 'YYYY') {
      resultParts.push(year);
    } else if (targetPart === 'YY') {
      resultParts.push(year.slice(-2));
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
