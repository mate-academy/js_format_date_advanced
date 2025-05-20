'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateStr, fromFormat, toFormat) {
  const [fromParts, fromSeparator] = [fromFormat.slice(0, 3), fromFormat[3]];
  const [toParts, toSeparator] = [toFormat.slice(0, 3), toFormat[3]];

  const dateValues = dateStr.split(fromSeparator);

  // Створюємо об'єкт з розпізнаними частинами дати
  const dateObj = {};

  fromParts.forEach((part, i) => {
    dateObj[part] = dateValues[i];
  });

  // Обробка скороченого року (YY → YYYY)
  if (dateObj['YY']) {
    const yy = parseInt(dateObj['YY'], 10);

    dateObj['YYYY'] =
      yy < 30
        ? `20${String(yy).padStart(2, '0')}`
        : `19${String(yy).padStart(2, '0')}`;
  }

  // Обробка скорочення року (YYYY → YY)
  if (dateObj['YYYY'] && toParts.includes('YY') && !dateObj['YY']) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  // Повертаємо новий формат
  return toParts.map((part) => dateObj[part]).join(toSeparator);
}

module.exports = formatDate;
