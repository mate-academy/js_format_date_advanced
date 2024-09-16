'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitElement = fromFormat[3];
  const joinElement = toFormat[3];
  const newDate = date.split(splitElement);

  let formatAgan = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      formatAgan[0] = newDate[i];
    }

    if (fromFormat[i] === 'MM') {
      formatAgan[1] = newDate[i];
    }

    if (fromFormat[i] === 'DD') {
      formatAgan[2] = newDate[i];
    }
  }

  let year = formatAgan[0];
  let month = formatAgan[1];
  let day = formatAgan[2];

  if (toFormat.includes('YYYY') && year.length === 2 && year < 30) {
    year = `${20}` + `${year}`;
  }

  if (toFormat.includes('YYYY') && year.length === 2 && year >= 30) {
    year = `${19}` + `${year}`;
  }

  if (toFormat.includes('YY')) {
    year = year.toString().slice(-2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      formatAgan[i] = year;
    }

    if (toFormat[i] === 'MM') {
      formatAgan[i] = month;
    }

    if (toFormat[i] === 'DD') {
      formatAgan[i] = day;
    }
  }
  console.log('fixed');
  return formatAgan.join(joinElement);
}

module.exports = formatDate;
