'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];

  // Розбиваємо рядок за роздільником
  const parts = date.split(fromSep);

  // Створюємо об'єкт для відповідності частин дати
  const dateParts = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateParts[part] = parts[index];
  });

  // Обробка формату року
  if ('YYYY' in dateParts && toFormat.includes('YY')) {
    dateParts['YY'] = dateParts['YYYY'].slice(2);
  } else if ('YY' in dateParts && toFormat.includes('YYYY')) {
    const year = parseInt(dateParts['YY'], 10);

    if (year === 0) {
      dateParts['YYYY'] = '2000';
    } else if (year < 30) {
      dateParts['YYYY'] = '20' + dateParts['YY'];
    } else {
      dateParts['YYYY'] = '19' + dateParts['YY'];
    }
  }

  // Формуємо вихідний рядок у новому форматі
  return [
    dateParts[toFormat[0]],
    dateParts[toFormat[1]],
    dateParts[toFormat[2]],
  ].join(toSep);
}
module.exports = formatDate;
