'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1]; // старый разделитель
  const toSeparator = toFormat[toFormat.length - 1]; // новый разделитель
  const parts = date.split(fromSeparator); // делим строку на части
  const dateObj = {};

  fromFormat.slice(0, -1).forEach((key, i) => {
    dateObj[key] = parts[i];
  });

  // 4 на 2
  if (dateObj.YYYY) {
    dateObj.YY = dateObj.YYYY.slice(2);
  }

  // 2 на 4
  if (dateObj.YY && !dateObj.YYYY) {
    const year = parseInt(dateObj.YY, 10);

    if (year < 30) {
      dateObj.YYYY = `20${dateObj.YY}`;
    } else {
      dateObj.YYYY = `19${dateObj.YY}`;
    }
  }

  // собираем новый формат
  const toParts = toFormat.slice(0, -1);
  const result = toParts.map((part) => dateObj[part]).join(toSeparator);

  return result;
}

module.exports = formatDate;
