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
  // Крок 1: Ініціалізація об'єктів та масивів для збереження частин дати
  const fullDate = {};
  const mainDate = [];

  /* Крок 2: Розбиття вхідної дати на частини
  відповідно до роздільника у fromFormat */
  const oldDate = date.split(fromFormat[3]);

  // Крок 3: Визначення нового роздільника та кроку століття для 2-значних років
  const newConnector = toFormat[3];
  const centuryStep = 30;

  // Крок 4: Перебір частин дати, вказаних у fromFormat

  for (let i = 0; i < fromFormat.length; i++) {
    // Зберігання кожної частини дати у об'єкті fullDate за ключами з fromFormat
    fullDate[fromFormat[i]] = oldDate[i];

    /* Якщо поточна частина - 'YY',
    обчислити відповідний 'YYYY' та зберегти його */
    if (fromFormat[i] === 'YY') {
      if (oldDate[i] < centuryStep) {
        fullDate['YYYY'] = `20${oldDate[i]}`;
      } else {
        fullDate['YYYY'] = `19${oldDate[i]}`;
      }
    }
  }

  // Крок 5: Перебір у визначеному форматі (toFormat)
  for (const value of toFormat) {
    // Пропустити новий роздільник у вихідному форматі
    if (value === newConnector) {
      continue;
    }

    // Крок 6: Залежно від значення
    switch (value) {
      // Якщо 'YY', додати останні дві цифри 'YYYY' до нового масиву
      case 'YY':
        mainDate.push(fullDate['YYYY'].slice(2));
        break;
      // В інших випадках додати відповідну частину дати до нового масиву
      default:
        mainDate.push(fullDate[value]);
        break;
    }
  }
  // Крок 7: З'єднати частини дати у рядок, використовуючи новий роздільник

  return mainDate.join(toFormat[3]);
}

module.exports = formatDate;
