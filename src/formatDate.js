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
  const oldSeparator = fromFormat.slice(3);
  const year = 'YYYY';
  const shortYear = 'YY';
  const newSeparator = toFormat.slice(3);
  const arryDate = date.split(oldSeparator);
  let yearDate;
  const monthIndex = fromFormat.indexOf('MM');
  const monthDate = arryDate[monthIndex];
  const day = fromFormat.indexOf('DD');
  const dayDate = arryDate[day];

  const indexYearShort = fromFormat.indexOf(shortYear);
  const indexYearlong = fromFormat.indexOf(year);
  let result;

  if (toFormat.includes(year) || toFormat.includes(shortYear)) {
    yearDate = arryDate[indexYearShort];
  }

  if (toFormat.includes(shortYear)) {
    if (fromFormat.includes(year)) {
      yearDate = arryDate[indexYearlong].split('').slice(2).join('');
    }
  }

  if (toFormat.includes(year)) {
    if (fromFormat.includes(shortYear)) {
      if (arryDate[indexYearShort] < 30) {
        yearDate = `20${yearDate}`;
      }

      if (arryDate[indexYearShort] >= 30) {
        yearDate = `19${yearDate}`;
      }
    }

    if (fromFormat.includes(year)) {
      yearDate = arryDate[indexYearlong];
    }
  }

  if (toFormat.indexOf('MM' === 0 && toFormat.indexOf(year) === 2)) {
    result = `${monthDate} ${dayDate} ${yearDate}`;
  }

  if (toFormat.indexOf(year) === 0 || toFormat.indexOf(shortYear) === 0) {
    result = `${yearDate} ${monthDate} ${dayDate}`;
  }

  if ((toFormat.indexOf(year) === 2 || toFormat.indexOf(shortYear) === 2)) {
    result = `${dayDate} ${monthDate} ${yearDate}`;
  }

  if ((toFormat.indexOf(year) === 2 || toFormat.indexOf(shortYear) === 2)
    && toFormat.indexOf('MM') === 0) {
    result = `${monthDate} ${dayDate} ${yearDate}`;
  }

  return result.split(' ').join(newSeparator);
}

module.exports = formatDate;

// * Час летить, стандарти змінюються. Давайте позбудемося рутини змінювати
//  * формат дати. Створіть функцію `formatDate`, яка приймає рядок `date`,
//  * старий масив fromFormat і новий масив toFormat. Функція повертає
//  * дата вказана в новому форматі.
//  * Функція може змінити роздільник, змінити порядок частин дати у конверті a
//  * рік від 4 цифр до 2 цифр і назад.
//  * Під час конвертації з YYYY на YY
// просто використовуйте 2 останні цифри (1997 -> 97).
//  * Під час конвертації з YY на
// YYYY використовуйте 20YY, якщо YY < 30, і 19YY в іншому випадку.
//  *
//  * Приклади:
//  *
//  * formatDate(
//  * '2020-02-18',
//  * ['РРРР', 'ММ', 'ДД', '-'],
//  * ['РРРР', 'ММ', 'ДД', '.'],
//  * ) // '2020.02.18'
//  *
//  * formatDate(
//  * '2020-02-18',
//  * ['РРРР', 'ММ', 'ДД', '-'],
//  * ['ДД', 'ММ', 'РРРР', '.'],
//  * ) // '18.02.2020'
//  *
//  * formatDate(
//  * '18-02-2020',
//  * ['ДД', 'ММ', 'РРРР', '-'],
//  * ['ДД', 'ММ', 'РР', '/'],
//  * ) // '18/02/20'
//  *
//  * formatDate(
//  * '20/02/18',
//  * ['РР', 'ММ', 'ДД', '/'],
//  * ['РРРР', 'ММ', 'ДД', '.'],
//  * ) // '2020.02.18'
//  *
//  * formatDate(
//  * '97/02/18',
//  * ['РР', 'ММ', 'ДД', '/'],
//  * ['ДД', 'ММ', 'РРРР', '.'],
//  * ) // '18.02.1997'
