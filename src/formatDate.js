'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const normalizeDate = date.split(fromFormat[3]);
  const finallyDate = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY' :
        year = normalizeDate[i];
        break;

      case 'YYYY' :
        year = normalizeDate[i].slice(2);
        break;

      case 'DD' :
        day = normalizeDate[i];
        break;

      case 'MM' :
        month = normalizeDate[i];
        break;

      default :
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY' :
        finallyDate[i] = formatYear(year);
        break;

      case 'YY' :
        finallyDate[i] = year;
        break;

      case 'MM' :
        finallyDate[i] = month;
        break;

      case 'DD' :
        finallyDate[i] = day;
        break;

      default :
        break;
    }
  }

  return finallyDate.join(toFormat[3]);
}

function formatYear(year) {
  if (+year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
}

module.exports = formatDate;
