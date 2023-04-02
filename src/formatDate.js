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
  const dateCopy = date.split(fromFormat[3]);
  const arr = Array.from(toFormat.slice(0, 3));

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i] === toFormat[j]) {
        arr[j] = dateCopy[i];
      }

      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        arr[j] = dateCopy[i].slice(2, 4);
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        if (dateCopy[i] < 30) {
          arr[j] = `20${dateCopy[i]}`;
        }

        if (dateCopy[i] >= 30 && dateCopy[i] <= 99) {
          arr[j] = `19${dateCopy[i]}`;
        }
      }
    }
  }

  return arr.join(toFormat[3]);
}

module.exports = formatDate;

/* Час летить, стандарти змінюються. Давайте позбудемося рутини змінювати
  * формат дати. Створіть функцію `formatDate`, яка приймає рядок `date`,
  * старий масив fromFormat і новий масив toFormat. Функція повертає
  * дата вказана в новому форматі.
  * Функція може змінити роздільник, змінити порядок частин дати у конверті a
  * рік від 4 цифр до 2 цифр і назад.
  * Під час конвертації з YYYY на YY просто використовуйте
  * 2 останні цифри (1997 -> 97).
  * Під час конвертації з YY на YYYY використовуйте 20YY,
  * якщо YY < 30, і 19YY в іншому випадку. */
