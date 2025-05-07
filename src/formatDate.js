'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const separator = fromFormat.slice(-1);
  const joiner = toFormat.slice(-1);
  const explodedDate = date.split(separator);
  let day = 0;
  let year = 0;
  let yearShort = 0;
  let yearLong = 0;
  let month = 0;
  let finalDate = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = explodedDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = explodedDate[i];
    }

    if (fromFormat[i] === 'YY') {
      year = explodedDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      year = explodedDate[i];
    }
  }

  year = year.toString();

  if (year.length > 3) {
    yearLong = year;
    yearShort = year.slice(2, 4);
  }

  if (year.length < 3 && year >= 30) {
    yearLong = `19${year}`;
    yearShort = year;
  }

  if (year.length < 3 && year < 30) {
    yearLong = `20${year}`;
    yearShort = year;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDate[i] = day;
    }

    if (toFormat[i] === 'MM') {
      newDate[i] = month;
    }

    if (toFormat[i] === 'YY') {
      newDate[i] = yearShort;
    }

    if (toFormat[i] === 'YYYY') {
      newDate[i] = yearLong;
    }
  }

  finalDate = newDate.join(joiner);

  return finalDate;
}

module.exports = formatDate;
