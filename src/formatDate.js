'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(fromSeparator);

  const indexes = {
    YYYY: fromFormat.indexOf('YYYY'),
    YY: fromFormat.indexOf('YY'),
    MM: fromFormat.indexOf('MM'),
    DD: fromFormat.indexOf('DD'),
  };

  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];

    if (part === 'YYYY') {
      if (dateParts[indexes['YYYY']] !== undefined) {
        newDate.push(dateParts[indexes['YYYY']]);
      } else {
        newDate.push(convertYear(dateParts[indexes['YY']], 'YY'));
      }
    } else if (part === 'YY') {
      if (dateParts[indexes['YY']] !== undefined) {
        newDate.push(dateParts[indexes['YY']]);
      } else {
        newDate.push(convertYear(dateParts[indexes['YYYY']], 'YYYY'));
      }
    } else if (indexes[part] !== -1) {
      newDate.push(dateParts[indexes[part]]);
    }
  }

  const toSeparator = toFormat[toFormat.length - 1];

  return newDate.join(toSeparator);
}

function convertYear(year, format) {
  if (format === 'YY') {
    const yy = Number(year);

    if (yy < 30) {
      return '20' + year;
    } else {
      return '19' + year;
    }
  } else if (format === 'YYYY') {
    return year.slice(-2);
  }
}

module.exports = formatDate;
