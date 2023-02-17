'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // Розділити рядок з датою на частини відповідно до старого формату
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const separator = `${toFormat[toFormat.length - 1]}`;
  // Створити об'єкт зі значеннями дати відповідно до старого формату
  const oldDateObj = {};
  const pushToArr = (elem) => newDate.push(elem);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldDateObj[fromFormat[i]] = dateParts[i];
  }

  // Створити новий рядок з датою відповідно до нового формату
  const newDate = [];

  //! Не робив окрему перевірку на YYYY, YY
  //!    - томущо всерівно прийшлося запускати цикл і коду в два рази більше.
  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (oldDateObj['YYYY']) {
          pushToArr(oldDateObj['YYYY']);
        } else {
          pushToArr(oldDateObj['YY'] < 30
            ? `20${oldDateObj['YYYY'] || oldDateObj['YY']}`
            : `19${oldDateObj['YYYY'] || oldDateObj['YY']}`);
        }
        break;

      case 'YY':
        if (oldDateObj['YYYY']) {
          pushToArr(oldDateObj['YYYY'].slice(2));
        } else {
          pushToArr(oldDateObj['YY']);
        }
        break;

      case 'MM':
        pushToArr(oldDateObj['MM'].toString().padStart(2, '0'));
        break;

      case 'DD':
        pushToArr(oldDateObj['DD'].toString().padStart(2, '0'));
        break;

      default:
        break;
    }
  }

  return newDate.join(separator);
}

module.exports = formatDate;
