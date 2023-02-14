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
  const dateArray = date.split(fromFormat[3]);
  // dateArray = ["2012", "12", "21"]
  const object = {};
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    object[fromFormat[i]] = dateArray[i];
    // добавляем в объект элемент и присваиваем ему - ключ : значение
    // ['YYYY', 'MM', 'DD', '-'] - из данного массива fromFormat[i]
    // т.е object = {DD: "21", MM: "12", YYYY: "2012"}
  };

  if (object.YYYY) {
    object.YY = object.YYYY.slice(2);
  };
  // если в новом object есть ключ YYYY, отрезаем два символа со 2-го;
  // и так же добавляем его в массив  
  // {DD: "21", MM: "12", YY: "12", YYYY: "2012"}

  if (object.YY < 30) {
    object.YYYY = '20' + `${object.YY}`;
  } else {
    object.YYYY = '19' + `${object.YY}`;
  }
  // При преобразовании из YY в YYYY используйте 20YY,
  // а если YY < 30, то 19YY
  // мы как бы изменяем названия ключей в YYYY: 
  //"2012"; если бы изначально был только формат YY;

  for (let i = 0; i < 3; i++) {
    newDate.push(object[toFormat[i]]);
  }
  // пушим в новый массив ЗНАЧЕНИЯ нашего объекта
  // по ключам уже из массива toFormat
  // не включая последний символ ['DD', 'MM', 'YYYY']
  // Например по ключу DD у нас в объекте  значение 21
  // получаем массив ["21", "12", "2012"]

  return newDate.join(toFormat[toFormat.length - 1]);
};
// Используя метод Join 
// и зная разделительный символ из массива toFormat[3] = '.'
// получаем нужную строку из массива;

module.exports = formatDate;
