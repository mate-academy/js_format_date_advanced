'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // Розділяємо дату на частини за допомогою роздільника у форматі fromFormat
  const separator = fromFormat.pop(); // Останній елемент - це роздільник
  const dateParts = date.split(separator);

  // Створюємо об'єкт, що містить частини дати відповідно до fromFormat
  const dateObj = {};

  fromFormat.forEach((part, i) => {
    dateObj[part] = dateParts[i];
  });

  // Конвертація формату року з YY в YYYY або назад
  if (dateObj.YYYY === undefined && dateObj.YY) {
    const year = Number(dateObj.YY);
    // Додаємо перевірку для року '00'

    if (year === 0) {
      dateObj.YYYY = '2000';
    } else {
      dateObj.YYYY =
        year < 30 ? '20' + String(year).padStart(2, '0') : '19' + year;
    }
  } else if (dateObj.YY === undefined && dateObj.YYYY) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  }

  // Формуємо нову дату у форматі toFormat
  const newSeparator = toFormat.pop();
  const newDate = toFormat.map((part) => dateObj[part]).join(newSeparator);

  return newDate;
}

module.exports = formatDate;
