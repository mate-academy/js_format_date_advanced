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
  const map = {};

  // Записуємо частини дати в map з перетворенням формату року
  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];
    const value = dateParts[i];

    if (key === 'YYYY') {
      map['YYYY'] = value;
      map['YY'] = value.slice(-2);
    } else if (key === 'YY') {
      map['YY'] = value;

      const yy = parseInt(value, 10);

      map['YYYY'] = (yy < 30 ? '20' : '19') + value;
    } else {
      map[key] = value;
    }
  }

  // Створюємо нову дату
  const result = toFormat
    .slice(0, 3)
    .map((key) => map[key])
    .join(toSeparator);

  return result;
}

module.exports = formatDate;
