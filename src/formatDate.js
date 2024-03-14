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
  const dateParts = date.split(fromSeparator);
  const datePartsMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    datePartsMap[fromFormat[i]] = dateParts[i];
  }

  // Конвертація року, якщо це потрібно
  const convertYear = (year, from, to) => {
    if (from === 'YYYY' && to === 'YY') {
      return year.slice(2);
    }

    if (from === 'YY' && to === 'YYYY') {
      return parseInt(year) < 30 ? '20' + year : '19' + year;
    }

    return year;
  };

  // Побудова нової дати у вказаному форматі
  const newDateParts = toFormat.slice(0, 3).map((part) => {
    if (part.includes('YY')) {
      const yearFormat = fromFormat.find((f) => f.includes('YY')) || 'YYYY';

      return convertYear(datePartsMap[yearFormat], yearFormat, part);
    }

    return datePartsMap[part];
  });

  const toSeparator = toFormat[3];

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
