'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  let year = '';
  let month = '';
  let day = '';

  for (const element of fromFormat) {
    if (element === 'YY' || element === 'YYYY') {
      year += dateArr[fromFormat.indexOf(element)];
    }

    if (element === 'MM') {
      month += dateArr[fromFormat.indexOf(element)];
    }

    if (element === 'DD') {
      day += dateArr[fromFormat.indexOf(element)];
    }
  }

  if (toFormat.includes('YYYY') && year.length < 4) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  if (toFormat.includes('YY') && year.length > 2) {
    year = year.split('').slice(2).join('');
  }

  const dateFormated = [];

  for (const element of toFormat) {
    if (element === 'YY' || element === 'YYYY') {
      dateFormated.push(year);
    }

    if (element === 'DD') {
      dateFormated.push(day);
    }

    if (element === 'MM') {
      dateFormated.push(month);
    }
  }

  return dateFormated.join(toFormat[3]);
}

module.exports = formatDate;
