'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSep = fromFormat[3];
  const newSep = toFormat[3];
  const splitedDate = date.split(oldSep);
  const newDate = [];
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        year = splitedDate[i];
        break;
      case 'DD':
        day = splitedDate[i];
        break;
      case 'MM':
        month = splitedDate[i];
    }
  }

  for (let i = 0; i < fromFormat.length; i++) {
    for (let j = 0; j < toFormat.length; j++) {
      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        year = year.split('').splice(2, 2).join('');
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY' && year > 21) {
        year = `19${year}`;
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY' && year < 22) {
        year = `20${year}`;
      }
    }
  }

  for (let i = 0; i < splitedDate.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
      case 'YY':
        newDate.push(year);
        break;
      case 'DD':
        newDate.push(day);
        break;
      case 'MM':
        newDate.push(month);
    }
  }

  return newDate.join(newSep);
}

module.exports = formatDate;
