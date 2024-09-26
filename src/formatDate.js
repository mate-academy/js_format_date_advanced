'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year, month, day;
  const oldFormat = date.split(fromFormat[3]);
  const formattedDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = oldFormat[i];
    }

    if (fromFormat[i].includes('M')) {
      month = oldFormat[i];
    }

    if (fromFormat[i].includes('D')) {
      day = oldFormat[i];
    }
  }

  if (String(year).length !== 4) {
    year = year < 30
      ? `20${year}`
      : `19${year}`;
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      formattedDate.push(year);
    }

    if (toFormat[i] === 'YY') {
      formattedDate.push(year.slice(2, 4));
    }

    if (toFormat[i].includes('M')) {
      formattedDate.push(month);
    }

    if (toFormat[i].includes('D')) {
      formattedDate.push(day);
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
