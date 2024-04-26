'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dataParts = date.split(fromFormat[3]);
  let year, month, day;

  for (let i = 0; i < fromFormat.length; i++) {
    const component = fromFormat[i];
    const value = dataParts[i];

    if (component === 'YYYY' || component === 'YY') {
      year = value;
    }

    if (component === 'MM') {
      month = value;
    }

    if (component === 'DD') {
      day = value;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (year < 30) {
      year = 20 + year;
    } else {
      year = 19 + year;
    }
  }

  const newDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    const component = toFormat[i];

    if (component === 'YYYY' || component === 'YY') {
      newDate.push(year);
    }

    if (component === 'MM') {
      newDate.push(month);
    }

    if (component === 'DD') {
      newDate.push(day);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
