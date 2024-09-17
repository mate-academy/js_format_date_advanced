'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const splittedDate = date.split(fromFormat[fromFormat.length - 1]);
  const result = [];
  let year = 0;
  let month = 0;
  let day = 0;
  let newYear = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = splittedDate[i];
  }

  for (const key of Object.keys(dateObj)) {
    switch (key) {
      case 'YY':
        year = dateObj[key];
        break;
      case 'YYYY':
        year = dateObj[key];
        break;
      case 'MM':
        month = dateObj[key];
        break;
      case 'DD':
        day = dateObj[key];
        break;

      default:
        break;
    }
  }
  newYear = year;

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    newYear = year < 30 ? `20${year}` : `19${year}`;
    // if (year < 30) {
    //   newYear = `20${year}`;
    // } else {
    //   newYear = `19${year}`;
    // }
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    newYear = `${year.toString().slice(-2)}`;
  }

  for (let i = 0; i <= toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'MM':
        result.push(month);
        break;
      case 'DD':
        result.push(day);
        break;
      case 'YY':
        result.push(newYear);
        break;
      case 'YYYY':
        result.push(newYear);
        break;
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
