'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let fromSeparator = '';

  for (const item of fromFormat) {
    if (item !== 'YYYY' && item !== 'YY' && item !== 'MM' && item !== 'DD') {
      fromSeparator = item;
      break; // Якщо знайшовся роздільник, то можна зупиняти цикл
    }
  }

  const dateParts = date.split(fromSeparator);

  const dateInfo = {};

  let valueIndex = 0; // окремий лічильник для чистих чисел

  for (const item of fromFormat) {
    if (item === 'YYYY' || item === 'YY') {
      dateInfo.year = dateParts[valueIndex];
      valueIndex++; // взяли значення — посунули лічильник для наступного кроку
    } else if (item === 'MM') {
      dateInfo.month = dateParts[valueIndex];
      valueIndex++;
    } else if (item === 'DD') {
      dateInfo.day = dateParts[valueIndex];
      valueIndex++;
    }
    /* якщо item — це роздільник, ми його просто ігноруємо,
       і лічильник чисел не зсувається! */
  }

  const hasYYYY = toFormat.includes('YYYY');
  const hasYY = toFormat.includes('YY');

  if (hasYY && dateInfo.year.length === 4) {
    /* Якщо в новому форматі вказано коротка форма року,
     а початковий формат був довгим, відрізаємо дві перші цифри */

    dateInfo.year = dateInfo.year.slice(-2);
  } else if (hasYYYY && dateInfo.year.length === 2) {
    /* Якщо в новому форматі вказано довга форма року,
    а в старому була коротка, розширюємо */

    if (Number(dateInfo.year) < 30) {
      dateInfo.year = '20' + dateInfo.year;
    } else {
      dateInfo.year = '19' + dateInfo.year;
    }
  }

  const finalParts = [];
  /* Створюємо чистий масив
    і наповнюмо його даними з об'єкта за зразком toFormats */

  for (const item of toFormat) {
    if (item === 'YYYY' || item === 'YY') {
      finalParts.push(dateInfo.year);
    } else if (item === 'MM') {
      finalParts.push(dateInfo.month);
    } else if (item === 'DD') {
      finalParts.push(dateInfo.day);
    }
  }

  let toSeparator = '';

  for (const item of toFormat) {
    if (item !== 'YYYY' && item !== 'YY' && item !== 'MM' && item !== 'DD') {
      toSeparator = item;
      break;
    }
  }

  const finalDateString = finalParts.join(toSeparator);

  // Перетворюємо результуючий масив в рядок + додаємо розділювач
  return finalDateString;
}

module.exports = formatDate;
