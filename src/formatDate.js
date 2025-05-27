'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const initialSeparator = fromFormat[3];
  const finalSeparator = toFormat[3];

  const fromParts = date.split(initialSeparator);

  // Створюємо мапу: формат -> значення
  const dateMap = {
    [fromFormat[0]]: fromParts[0],
    [fromFormat[1]]: fromParts[1],
    [fromFormat[2]]: fromParts[2],
  };

  function convertYear(year, from, to) {
    if (from === to) {
      return year;
    }

    if (from === 'YY' && to === 'YYYY') {
      const yearNum = parseInt(year);

      return yearNum < 30 ? `20${year}` : `19${year}`;
    }

    if (from === 'YYYY' && to === 'YY') {
      return year.slice(-2);
    }

    return year;
  }

  // Знаходимо який формат року в оригіналі
  const originalYearFormat = fromFormat.find(
    (part) => part === 'YY' || part === 'YYYY',
  );
  const originalYearValue = dateMap[originalYearFormat];

  const changedDateFormat = toFormat.slice(0, 3).map((part) => {
    if (part === 'YY' || part === 'YYYY') {
      // Для року використовуємо convertYear з правильними параметрами
      return convertYear(originalYearValue, originalYearFormat, part);
    } else {
      // Для місяця та дня просто повертаємо значення
      return dateMap[part];
    }
  });

  return changedDateFormat.join(finalSeparator);
}

module.exports = formatDate;
