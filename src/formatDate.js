'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  // Розкладаємо в об'єкт для зручності
  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = dateParts[i];
  }

  // Обробка року
  if (map['YYYY']) {
    map['YY'] = map['YYYY'].slice(-2);
  }

  if (map['YY'] && !map['YYYY']) {
    const year = Number(map['YY']);

    map['YYYY'] = year < 30 ? '20' + map['YY'] : '19' + map['YY'];
  }

  // Формуємо нову дату
  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(map[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
