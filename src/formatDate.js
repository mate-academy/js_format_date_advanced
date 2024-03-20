'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  let newDateParts = [];

  toFormat.forEach((part) => {
    switch (part) {
      case 'YYYY':
        newDateParts.push(getFullYear(dateParts, fromFormat));
        break;
      case 'YY':
        newDateParts.push(getShortYear(dateParts, fromFormat));
        break;
      case 'MM':
        newDateParts.push(getMonth(dateParts, fromFormat));
        break;
      case 'DD':
        newDateParts.push(getDay(dateParts, fromFormat));
        break;
      default:
        newDateParts.push(part);
    }
  });

  newDateParts = newDateParts.join(toFormat[3]);

  if (newDateParts[newDateParts.length - 2] === toFormat[3]) {
    newDateParts = newDateParts.slice(0, -2);
  }

  return newDateParts;
}

function getFullYear(dateParts, fromFormat) {
  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      return dateParts[i];
    } else if (fromFormat[i] === 'YY') {
      const year = +dateParts[i];

      if (year < 30) {
        return '20' + dateParts[i];
      } else {
        return '19' + dateParts[i];
      }
    }
  }
}

function getShortYear(dateParts, fromFormat) {
  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY') {
      return dateParts[i];
    } else if (fromFormat[i] === 'YYYY') {
      return dateParts[i].slice(-2);
    }
  }
}

function getMonth(dateParts, fromFormat) {
  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'MM') {
      return dateParts[i];
    }
  }
}

function getDay(dateParts, fromFormat) {
  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      return dateParts[i];
    }
  }
}

module.exports = formatDate;
