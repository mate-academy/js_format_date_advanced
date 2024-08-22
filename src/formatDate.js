'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // делим дату на части
  const delimiter = date.split(fromFormat[3]);
  const newDateObject = {};

  for (let i = 0; i < 3; i++) {
    newDateObject[fromFormat[i]] = delimiter[i];
  }
  // Новые переменные для преобразования годов

  const CURRENT_CENTURY_THRESHOLD = 30;
  const CENTURY_1900 = '19';
  const CENTURY_2000 = '20';
  // проверка если в fromFormat есть YYYY, а в toFormat — YY,
  // то newDateObject['YY'] будет присвоено последние две цифры

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    newDateObject['YY'] = newDateObject['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(newDateObject['YY']);

    newDateObject['YYYY'] =
      year < CURRENT_CENTURY_THRESHOLD
        ? CENTURY_2000 + newDateObject['YY']
        : CENTURY_1900 + newDateObject['YY'];
  }
  // Проверка, что toFormat имеет достаточное количество элементов

  if (toFormat.length >= 4) {
    // формирование новой даты
    const newDate = toFormat
      .slice(0, 3)
      .map((part) => newDateObject[part])
      .join(toFormat[3]);

    return newDate;
  } else {
    throw new Error('Invalid toFormat: it should have at least 4 elements.');
  }
}

module.exports = formatDate;
