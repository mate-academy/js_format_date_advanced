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
  const dateArray = date.split(fromFormat[3]);
  const dateFromObject = {};

  for (let i = 0; i < 3; i++) {
    dateFromObject[fromFormat[i]] = dateArray[i];
  }

  const newDateArr = [];

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD':
      case 'MM':
        newDateArr.push(dateFromObject[toFormat[i]]);
        break;
      case 'YYYY':
        if ('YYYY' in dateFromObject) {
          newDateArr.push(dateFromObject['YYYY']);
        } else {
          const year = +dateFromObject['YY'];

          if (year < 30) {
            newDateArr.push('20' + dateFromObject['YY']);
          } else {
            newDateArr.push('19' + dateFromObject['YY']);
          }
        }
        break;
      case 'YY':
        if ('YY' in dateFromObject) {
          newDateArr.push(dateFromObject['YY']);
        } else {
          newDateArr.push(dateFromObject['YYYY'].slice(2));
        }
        break;
      default:
        throw new Error('Incorrect date format.');
    }
  }

  return newDateArr.join(toFormat[3]);
}

// const date = formatDate(
//   '2020-02-18',
//   ['YYYY', 'MM', 'DD', '-'],
//   ['YYYY', 'MM', 'DD', '.'],
// ); // '2020.02.18'

// const date = formatDate(
//   '2020-02-18',
//   ['YYYY', 'MM', 'DD', '-'],
//   ['DD', 'MM', 'YYYY', '.'],
// ); // '18.02.2020'

// const date = formatDate(
//   '18-02-2020',
//   ['DD', 'MM', 'YYYY', '-'],
//   ['DD', 'MM', 'YY', '/'],
// ); // '18/02/20'

// const date = formatDate(
//   '20/02/18',
//   ['YY', 'MM', 'DD', '/'],
//   ['YYYY', 'MM', 'DD', '.'],
// ); // '2020.02.18'

// const date = formatDate(
//   '97/02/18',
//   ['YY', 'MM', 'DD', '/'],
//   ['DD', 'MM', 'YYYY', '.'],
// ); // '18.02.1997'

// console.log(date);

module.exports = formatDate;
