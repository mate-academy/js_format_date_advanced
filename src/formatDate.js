'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  // 2. Separamos os valores da data original
  const dateParts = date.split(fromSeparator);
  const dateMap = {};

  // 3. Mapeamos os valores (ex: { YYYY: '2020', MM: '02', ... })
  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  // 4. Montamos o novo array de partes baseado no toFormat
  const resultParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const targetKey = toFormat[i];

    // Regra: YYYY -> YY (2020 -> 20)
    if (targetKey === 'YY' && dateMap['YYYY']) {
      resultParts.push(dateMap['YYYY'].slice(-2));
      continue;
    }

    // Regra: YY -> YYYY (Baseado no limite 30)
    if (targetKey === 'YYYY' && dateMap['YY']) {
      const yearNum = parseInt(dateMap['YY']);
      const prefix = yearNum < 30 ? '20' : '19';

      resultParts.push(prefix + dateMap['YY']);
      continue;
    }

    // Caso padrão (MM, DD ou chaves idênticas)
    resultParts.push(dateMap[targetKey]);
  }

  // 5. Unimos as partes com o novo separador
  return resultParts.join(toSeparator);
}

module.exports = formatDate;
