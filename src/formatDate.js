'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromSeperator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(fromSeperator);
  const indexes = {
    YYYY: fromFormat.indexOf('YYYY'),
    YY: fromFormat.indexOf('YY'),
    MM: fromFormat.indexOf('MM'),
    DD: fromFormat.indexOf('DD'),
  };

  const newDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    const part = toFormat[i];

    if (part !== toFormat[toFormat.length - 1]) {
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
          newDate.push(dateParts[indexes['YYYY']].slice(-2));
        }
      } else {
        newDate.push(dateParts[indexes[part]]);
      }
    }
  }

  const toSeperator = toFormat[toFormat.length - 1];

  return newDate.join(toSeperator);
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
