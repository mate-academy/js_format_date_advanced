'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let newArr = [];
  let year = '';
  let mounth = '';
  let day = '';
  const lastArr = [];
  let yearFour = '';
  let yearTwo = '';
  let result = '';

  if (fromFormat[3] === '-') {
    newArr = date.split('-');
  }

  if (fromFormat[3] === '/') {
    newArr = date.split('/');
  }

  if (fromFormat[3] === '.') {
    newArr = date.split('.');
  }

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = newArr[i];
    } else if (fromFormat[i] === 'MM') {
      mounth = newArr[i];
    } else {
      day = newArr[i];
    }
  }

  if (year > 99) {
    yearFour = year;
    yearTwo = year.slice(2);
  }

  if (year < 100) {
    yearTwo = year;

    if (year < 30) {
      yearFour = '20' + year;
    } else {
      yearFour = '19' + year;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      lastArr[i] = day;
    }

    if (toFormat[i] === 'MM') {
      lastArr[i] = mounth;
    }

    if (toFormat[i] === 'YY') {
      lastArr[i] = yearTwo;
    }

    if (toFormat[i] === 'YYYY') {
      lastArr[i] = yearFour;
    }
  }

  if (toFormat[3] === '-') {
    result = lastArr.join('-');
  }

  if (toFormat[3] === '/') {
    result = lastArr.join('/');
  }

  if (toFormat[3] === '.') {
    result = lastArr.join('.');
  }

  return result;
}

module.exports = formatDate;
