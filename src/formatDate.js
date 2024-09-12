'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const givenDate = date.split(fromFormat[3]);
  const givenFormat = fromFormat.slice(0, 3);
  const resultFormat = toFormat.slice(0, 3);
  const newDate = [];
  let day,
    month,
    year;

  for (let i = 0; i < givenFormat.length; i++) {
    switch (givenFormat[i]) {
      case 'DD':
        day = givenDate[i];
        break;
      case 'MM':
        month = givenDate[i];
        break;
      case 'YY':
      case 'YYYY':
        year = givenDate[i];
        break;
    }
  }

  if (year.length === 2) {
    year = +year < 30 ? `20${year}` : `19${year}`;
  }

  for (let i = 0; i < resultFormat.length; i++) {
    switch (resultFormat[i]) {
      case 'DD':
        newDate.push(day);
        break;
      case 'MM':
        newDate.push(month);
        break;
      case 'YYYY':
        newDate.push(year);
        break;
      case 'YY':
        newDate.push(year.slice(-2));
        break;
    }
  }

  return newDate.join(toFormat[3]).toString();
}

module.exports = formatDate;
