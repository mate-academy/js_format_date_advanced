'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];

  const dateValue = date.split(fromSep);
  const partsArchive = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const key = fromFormat[i];

    partsArchive[key] = dateValue[i];
  }

  if (partsArchive['YYYY'] && toFormat.includes('YY')) {
    partsArchive['YY'] = partsArchive['YYYY'].slice(-2);
  }

  if (partsArchive['YY'] && toFormat.includes('YYYY')) {
    const yearShort = Number(partsArchive['YY']);

    partsArchive['YYYY'] = (yearShort < 30 ? '20' : '19') + partsArchive['YY'];
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    result.push(partsArchive[key]);
  }

  return result.join(toSep); // <--- Фінальний результат
}

module.exports = formatDate;
