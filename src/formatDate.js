'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year = null;
  let day = null;
  let month = null;
  let newArr = 'dsfsdfsd';

  // #region toFormat
  switch (fromFormat.join('')) {
    case 'YYYYMMDD-':
      newArr = date.split('-');
      year = newArr[0];
      month = newArr[1];
      day = newArr[2];

      break;

    case 'YYYYMMDD.':
      newArr = date.split('.');
      year = newArr[0];
      month = newArr[1];
      day = newArr[2];

      break;

    case 'DDMMYYYY.':
      newArr = date.split('.');
      year = newArr[2];
      month = newArr[1];
      day = newArr[0];

      break;
    case 'DDMMYYYY-':
      newArr = date.split('-');
      year = newArr[2];
      month = newArr[2];
      day = newArr[0];

      break;
    case 'DDMMYY/':
      newArr = date.split('.');

      if (newArr[2] <= 30) {
        year = '20' + newArr[2];
      } else {
        year = '19' + newArr[2];
      }
      month = newArr[1];
      day = newArr[0];

      break;

    case 'YYMMDD/':
      newArr = date.split('/');

      if (newArr[0] >= 30) {
        year = '19' + newArr[0];
      } else {
        year = '20' + newArr[0];
      }
      month = newArr[1];
      day = newArr[2];

      break;

    case 'MMYYYYDD-':
      newArr = date.split('-');
      year = newArr[1];
      month = newArr[0];
      day = newArr[2];

      break;

    case 'MMDDYYYY/':
      newArr = date.split('/');
      year = newArr[2];
      month = newArr[0];
      day = newArr[1];

      break;

    case 'YYMMDD.':
      newArr = date.split('.');

      if (newArr[0] >= 30) {
        year = '19' + newArr[0];
      } else {
        year = '20' + newArr[0];
      }
      month = newArr[1];
      day = newArr[2];

      break;

    default:
  }

  if (year === '00') {
    year = '2000';
  }

  // #endregion

  // #region fromFormat
  switch (toFormat.join('')) {
    case 'YYYYMMDD.':
      return year + '.' + month + '.' + day;
    case 'DDMMYYYY-':
      return day + '-' + month + '-' + year;
    case 'DDMMYY/':
      year.slice(2);

      return day + '/' + month + '/' + year;

    case 'YYYYMMDD-':
      return year + '-' + month + '-' + day;

    case 'MMDDYY/':
      return month + '/' + day + '/' + year.slice(2);

    case 'YYYYMMDD/':
      return year + '/' + month + '/' + day;
    default:
      break;
  }

  // #endregion
}

module.exports = formatDate;

// formatDate(
//         '2012-12-21',
//         ['YYYY', 'MM', 'DD', '-'],
//         ['YYYY', 'MM', 'DD', '.'],
//       );
