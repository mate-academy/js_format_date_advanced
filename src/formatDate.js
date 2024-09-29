'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // Створюємо копії fromFormat і toFormat, щоб не змінювати параметри функції
  const fromFormatCopy = [...fromFormat];
  const toFormatCopy = [...toFormat];

  // Отримуємо роздільник з копії fromFormat (останній елемент масиву)
  const fromSeparator = fromFormatCopy.pop();
  const toSeparator = toFormatCopy.pop();

  // Розбиваємо дату на частини за роздільником
  const dateParts = date.split(fromSeparator);

  // Створюємо об'єкт, який зіставляє формат з частинами дати
  const dateObj = {};

  fromFormatCopy.forEach((part, index) => {
    dateObj[part] = dateParts[index];
  });

  // Конвертуємо з YY в YYYY, якщо потрібно
  if (dateObj.YY && !dateObj.YYYY) {
    const year = parseInt(dateObj.YY, 10);

    dateObj.YYYY = year < 30 ? '20' + dateObj.YY : '19' + dateObj.YY;
  }

  // Конвертуємо з YYYY в YY, якщо потрібно
  if (dateObj.YYYY && !dateObj.YY) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  }

  // Створюємо нову дату у форматі toFormat
  const newDate = toFormatCopy.map((part) => dateObj[part]).join(toSeparator);

  return newDate;
}

module.exports = formatDate;
