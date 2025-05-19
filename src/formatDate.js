'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sourceSeparator = fromFormat[fromFormat.length - 1];
  const buildSeparator = toFormat[toFormat.length - 1];

  const splittedDate = date.split(sourceSeparator);
  const newDate = [];

  let year, month, day;

  for (let index = 0; index < splittedDate.length; index++) {
    if (fromFormat[index] === 'YYYY') {
      year = splittedDate[index];
    } else if (fromFormat[index] === 'YY') {
      year = splittedDate[index];
    }

    if (fromFormat[index] === 'MM') {
      month = splittedDate[index];
    }

    if (fromFormat[index] === 'DD') {
      day = splittedDate[index];
    }
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    year = year.slice(-2);
  }

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    if (+year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      newDate.push(year);
    }

    if (toFormat[i] === 'MM') {
      newDate.push(month);
    }

    if (toFormat[i] === 'DD') {
      newDate.push(day);
    }
  }

  return newDate.join(buildSeparator);
}

module.exports = formatDate;
