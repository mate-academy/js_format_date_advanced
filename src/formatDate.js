'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const currentDate = determineDate(date, fromFormat);
  const result = [];

  for (const value of toFormat) {
    switch (value) {
      case 'DD': {
        result.push(currentDate['DD']);
        break;
      }

      case 'MM': {
        result.push(currentDate['MM']);
        break;
      }

      case 'YY': {
        const year = formatYear('YY', currentDate.year);

        result.push(year);
        break;
      }

      case 'YYYY': {
        const year = formatYear('YYYY', currentDate.year);

        result.push(year);
        break;
      }
      default:
        break;
    }
  }

  return result.join(getSeparator(toFormat));
}

function determineDate(date, format) {
  const separator = getSeparator(format);
  const numbersFromDate = date.split(separator);
  const dateStructure = {};

  for (let i = 0; i < format.length; i++) {
    switch (format[i]) {
      case 'DD': {
        dateStructure['DD'] = numbersFromDate[i];
        break;
      }

      case 'MM': {
        dateStructure['MM'] = numbersFromDate[i];
        break;
      }

      case 'YY':
        dateStructure.year = numbersFromDate[i];
        break;

      case 'YYYY': {
        dateStructure.year = numbersFromDate[i];
        break;
      }

      default:
        break;
    }
  }

  return dateStructure;
}

function formatYear(value, year) {
  if (value === 'YY') {
    if (year.length > 2) {
      return year.slice(-2);
    }

    return year;
  }

  if (value === 'YYYY') {
    if (year === '00') {
      return 2000;
    }

    if (year.length <= 2) {
      if (year >= 30) {
        return 19 + year;
      } else {
        return 20 + year;
      }
    }

    return year;
  }
}

function getSeparator(format) {
  return format[format.length - 1];
}
module.exports = formatDate;
