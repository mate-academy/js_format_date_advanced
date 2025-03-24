'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // Створюємо об'єкт для збереження компонентів дати
  const dateComponents = {};

  // Розбиваємо вхідну дату за роздільником
  const dateArray = date.split(fromFormat[3]);

  // Заповнюємо об'єкт dateComponents відповідно до fromFormat
  for (let i = 0; i < 3; i++) {
    // Отримуємо одиницю дати (day, month, year)
    const unit = fromFormat[i].toLowerCase();

    // Записуємо компонент в об'єкт
    dateComponents[unit] = dateArray[i];
  }

  // Створюємо змінну для результату
  let formattedDate = '';

  // Проходимо через всі компоненти
  // і перетворюємо їх у відповідності до toFormat
  for (let i = 0; i < 3; i++) {
    const unit = toFormat[i].toLowerCase(); // Одиниця для виведення
    // Отримуємо відповідне значення з dateComponents
    let value = dateComponents[unit];

    // Перевірка на конвертацію з 'YYYY' в 'YY' або з 'YY' в 'YYYY'
    if (unit === 'yy') {
      // Якщо формат 'YY' і рік вийшов як чотирицифровий

      if (dateComponents['yyyy'] && dateComponents['yyyy'].length === 4) {
        // Беремо тільки останні дві цифри
        value = dateComponents['yyyy'].slice(2);
      }
    }

    if (unit === 'yyyy') {
      // Якщо 'YY' і рік короткий (дві цифри),
      // додаємо 20 або 19 в залежності від значення
      if (dateComponents['yy'] && dateComponents['yy'].length === 2) {
        // parseInt щоб перетворити рядок у число
        const year = parseInt(dateComponents['yy']);

        // Якщо рік < 30, додаємо 20
        if (year < 30) {
          value = '20' + dateComponents['yy'];
        } else {
          // Якщо рік >= 30, додаємо 19
          value = '19' + dateComponents['yy'];
        }
      }
    }

    // Додаємо компонент до сформованої дати
    formattedDate += value;

    // Якщо це не останній компонент, додаємо роздільник
    if (i < 2) {
      formattedDate += toFormat[3];
    }
  }

  return formattedDate;
}

module.exports = formatDate;
