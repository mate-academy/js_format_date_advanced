/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // 1. Визначаємо роздільник
  const fromSeparator = fromFormat.find(
    (el) => !['YYYY', 'YY', 'MM', 'DD'].includes(el),
  );
  const toSeparator = toFormat.find(
    (el) => !['YYYY', 'YY', 'MM', 'DD'].includes(el),
  );

  // 2. Отримуємо компоненти дати
  const dateParts = date.split(fromSeparator);
  const formatMap = {};

  fromFormat.forEach((token, idx) => {
    if (['YYYY', 'YY', 'MM', 'DD'].includes(token)) {
      formatMap[token] = dateParts[idx];
    }
  });

  // 3. Нормалізуємо рік
  if (formatMap['YY'] && !formatMap['YYYY']) {
    const shortYear = parseInt(formatMap['YY']);

    formatMap['YYYY'] =
      shortYear < 30 ? '20' + formatMap['YY'] : '19' + formatMap['YY'];
  } else if (formatMap['YYYY'] && !formatMap['YY']) {
    formatMap['YY'] = formatMap['YYYY'].slice(-2);
  }

  // 4. Додаємо відформатовані частини
  const resultParts = toFormat
    .filter((token) => ['YYYY', 'YY', 'MM', 'DD'].includes(token))
    .map(
      (token) =>
        token === 'MM' || token === 'DD'
          ? formatMap[token].padStart(2, '0')
          : formatMap[token], // Додана кома
    );

  // 5. Склеюємо результат з toSeparator
  return resultParts.join(toSeparator);
}

module.exports = formatDate;
