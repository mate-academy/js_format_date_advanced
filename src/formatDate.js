'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const startFormat = [...fromFormat];
  const endFormat = [...toFormat];
  const startDate = date.split(`${startFormat[3]}`, 3);
  let year = 0;
  let month = 0;
  let day = 0;
  let newDate = '';

  for (let i = 0; i < 3; i++) {
    switch (startFormat[i]) {
      case 'YYYY':
        year = startDate[i];
        break;
      case 'YY':
        year = startDate[i];
        break;
      case 'MM':
        month = startDate[i];
        break;
      case 'DD':
        day = startDate[i];
        break;
      default:
        return '';
    }
  }

  for (let i = 0; i < 3; i++) {
    if (i > 0) {
      newDate += endFormat[3];
    }

    switch (endFormat[i]) {
      case 'YYYY':
        if (year.length === 4) {
          newDate += year;
        } else {
          newDate += getLongerYear(year);
        }
        break;
      case 'YY':
        if (year.length === 2) {
          newDate += year;
        } else {
          newDate += getShorterYear(year);
        }
        break;
      case 'MM':
        newDate += month;
        break;
      case 'DD':
        newDate += day;
        break;
      default:
        return '';
    }
  }

  return newDate;
}

function getLongerYear(year) {
  if (+year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
}

function getShorterYear(year) {
  return year.split('').slice(2, 4).join('');
}

module.exports = formatDate;
