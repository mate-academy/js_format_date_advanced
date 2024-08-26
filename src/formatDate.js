'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dates = date.split(fromFormat[fromFormat.length - 1]);
  const newFromDate = {};

  for (let i = 0; i < fromFormat.length; i++) {
    const format = fromFormat[i];

    if (format === 'YYYY') {
      newFromDate.year = +dates[i];
    } else if (format === 'YY') {
      newFromDate.year = +dates[i];

      if (newFromDate.year < 30) {
        newFromDate.year += 2000;
      } else {
        newFromDate.year += 1900;
      }
    } else if (format === 'MM') {
      newFromDate.month = dates[i];
    } else if (format === 'DD') {
      newFromDate.day = dates[i];
    }
  }

  const formattedDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    const format = toFormat[i];

    switch (format) {
      case 'YYYY':
        formattedDate.push(newFromDate.year);
        break;

      case 'YY':
        formattedDate.push(newFromDate.year % 100);
        break;

      case 'MM':
        formattedDate.push(newFromDate.month);
        break;

      case 'DD':
        formattedDate.push(newFromDate.day);
        break;
    }
  }

  return formattedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
