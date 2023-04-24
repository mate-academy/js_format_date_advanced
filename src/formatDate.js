'use strict';

/**
 * Час летить, змінюються стандарти.Давайте позбумось від рутини зміни
 * формат дати.Створити функцію `formatdate`, яка приймає рядок` date ',
 * Старий масив `friformat` та новий масив` toformat`.Функція повертається
 * Дата в новому форматі.
 * Функція може змінити сепаратор, переробити частини дати перетворення a
 * Рік від 4 цифр до 2 цифр і назад.
 * Під час перетворення з Yyyy в Yy просто
 * використовуйте 2 останню цифру (1997 -> 97).
 * При перетворенні з Yy в Yyyy використовуйте 20yy, якщо Yy <30 і 19yy інакше.
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
  // write code here
  const dateArr = fromFormat.pop();
  const newArr = toFormat.pop();
  const arrDate = date.split(dateArr);
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = arrDate[i];
  }

  const newDate = [];

  for (const key of toFormat) {
    if (key === 'YY' && 'YYYY' in dateObj) {
      newDate.push(dateObj.YYYY.substring(2));
    } else if (key === 'YYYY' && 'YY' in dateObj) {
      if (dateObj.YY < 30) {
        newDate.push(`20${dateObj.YY}`);
      } else {
        newDate.push(`19${dateObj.YY}`);
      }
    } else {
      newDate.push(dateObj[key]);
    }
  }

  return newDate.join(newArr);
}

module.exports = formatDate;
