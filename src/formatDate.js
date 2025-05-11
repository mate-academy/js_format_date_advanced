'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FORMAT_KEYS = ['YYYY', 'YY', 'MM', 'DD'];

  // Витяг формату й роздільника
  const fromKeys = fromFormat.filter((key) => FORMAT_KEYS.includes(key));
  const toKeys = toFormat.filter((key) => FORMAT_KEYS.includes(key));
  const fromSeparator = fromFormat.find((key) => !FORMAT_KEYS.includes(key));
  const toSeparator = toFormat.find((key) => !FORMAT_KEYS.includes(key));

  // Парсинг дати
  const dateParts = fromSeparator
    ? date.split(fromSeparator)
    : [date.slice(0, 4), date.slice(4, 6), date.slice(6)];
  const map = {};

  for (let i = 0; i < fromKeys.length; i++) {
    map[fromKeys[i]] = dateParts[i];
  }

  // Рік: YY <-> YYYY
  if (map['YYYY'] && !map['YY']) {
    map['YY'] = map['YYYY'].slice(-2);
  }

  if (map['YY'] && !map['YYYY']) {
    const yy = parseInt(map['YY'], 10);

    map['YYYY'] = yy < 30 ? '20' + map['YY'] : '19' + map['YY'];
  }

  const resultParts = toKeys.map((key) => map[key]);

  return toSeparator ? resultParts.join(toSeparator) : resultParts.join('');
}

module.exports = formatDate;
