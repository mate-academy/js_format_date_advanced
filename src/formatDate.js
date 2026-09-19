'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(/[/.-]/);
  const dateMap = {};

  // Розділювач для результату
  const targetDelimiter = toFormat[toFormat.length - 1];

  // Заповнюємо dateMap за вхідним форматом
  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  // Конвертація YYYY та YY
  if (dateMap['YYYY'] && !dateMap['YY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (dateMap['YY'] && !dateMap['YYYY']) {
    const yearNum = Number(dateMap['YY']);
    const century = yearNum < 30 ? '20' : '19';

    dateMap['YYYY'] = century + dateMap['YY'];
  }

  // Збираємо результат
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    result.push(dateMap[key]);
  }

  return result.join(targetDelimiter);
}

module.exports = formatDate;
