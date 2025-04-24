'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
const separatorTo = toFormat[3];

const parts = date.split(separatorFrom);
const map = {};

// Прив'язуємо значення до ключів з fromFormat
for (let i = 0; i < 3; i++) {
  map[fromFormat[i]] = parts[i];
}

// Перетворення з YY → YYYY
if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
  const yy = parseInt(map['YY']);
  map['YYYY'] = yy < 30 ? `20${map['YY']}` : `19${map['YY']}`;
}

// Перетворення з YYYY → YY
if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
  map['YY'] = map['YYYY'].slice(-2);
}

// Формування фінального рядка
return toFormat
  .slice(0, 3)
  .map(key => map[key])
  .join(separatorTo);

}

module.exports = formatDate;
