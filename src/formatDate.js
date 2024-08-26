'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // eslint-disable-next-line max-len
  const dateParts = date.split(fromFormat[3]); // Використовуємо роздільник з fromFormat

  // Створюємо об'єкт для зручного доступу до частин дати
  const dateObj = {};

  fromFormat.slice(0, 3).forEach((format, index) => {
    dateObj[format] = dateParts[index];
  });

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateObj['YY']) {
      const year = parseInt(dateObj['YY'], 10);

      dateObj['YYYY'] = year < 30 ? `20${dateObj['YY']}` : `19${dateObj['YY']}`;
    }
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    if (dateObj['YYYY']) {
      dateObj['YY'] = dateObj['YYYY'].slice(-2);
    }
  }

  // Формуємо новий формат дати
  const formattedDate = toFormat
    .slice(0, 3)
    .map((format) => dateObj[format] || dateObj[format.replace('YYYY', 'YY')])
    .join(toFormat[3]);

  return formattedDate;
}

module.exports = formatDate;
