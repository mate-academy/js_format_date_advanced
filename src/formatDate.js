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

  // Розбиваємо вхідну дату на частини
  const dateParts = date.split(fromSeparator);

  // Обʼєкт для збереження частин дати
  const parts = {
    YYYY: '',
    YY: '',
    MM: '',
    DD: '',
  };

  // Перебираємо перші 3 елементи формату та витягуємо відповідні значення
  for (let i = 0; i < 3; i++) {
    const partName = fromFormat[i];

    const value = dateParts[i]; // відповідне значення з дати
    // додається до обʼєкту після перевірки умови

    switch (partName) {
      case 'YYYY':
        // Якщо формат — повний рік, зберігаємо і його, і скорочену версію
        parts.YYYY = value;
        parts.YY = value.slice(2);
        break;

      case 'YY':
        // Якщо скорочений рік, визначаємо століття і формуємо повний рік
        parts.YY = value;

        // const century = +value < 30 ? '20' : '19';
        parts.YYYY = `${+value < 30 ? '20' : '19'}${value}`;
        // parts.YYYY = century + value;
        break;

      case 'MM':
        parts.MM = value;
        break;

      case 'DD':
        parts.DD = value;
        break;
    }
  }

  // Формуємо масив частин нової дати
  const newDateParts = [];

  // Додаємо до масиву відповідні частини дати згідно з новим форматом
  for (const target of toFormat) {
    if (target === 'YYYY') {
      newDateParts.push(parts.YYYY);
    }

    if (target === 'YY') {
      newDateParts.push(parts.YY);
    }

    if (target === 'MM') {
      newDateParts.push(parts.MM);
    }

    if (target === 'DD') {
      newDateParts.push(parts.DD);
    }
  }

  // Обʼєднуємо частини нової дати з новим роздільником
  return newDateParts.join(toSeparator);
}

formatDate('21/02/18', ['YY', 'MM', 'DD', '/'], ['YYYY', 'MM', 'DD', '.']);

module.exports = formatDate;
