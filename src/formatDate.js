'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatedDate = date.split(fromFormat[3]);

  const fromMap = {};

  let year;

  fromMap[fromFormat[0]] = separatedDate[0];
  fromMap[fromFormat[1]] = separatedDate[1];
  fromMap[fromFormat[2]] = separatedDate[2];

  if ('YY' in fromMap && toFormat.includes('YYYY')) {
    const yyValue = fromMap['YY'];

    year = yyValue < 30 ? `20${yyValue}` : `19${yyValue}`;
  } else if ('YYYY' in fromMap && toFormat.includes('YY')) {
    const yyyyValue = fromMap['YYYY'];

    year = yyyyValue.slice(-2);
  } else {
    year = fromMap['YY'] || fromMap['YYYY'];
  }

  const yearToUse = year;
  const monthToUse = fromMap['MM'];
  const dayToUse = fromMap['DD'];

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const partType = toFormat[i];

    if (partType === 'YYYY' || partType === 'YY') {
      resultParts.push(yearToUse);
    } else if (partType === 'MM') {
      resultParts.push(monthToUse);
    } else if (partType === 'DD') {
      resultParts.push(dayToUse);
    }
  }

  const result = resultParts.join(`${toFormat[3]}`);

  return result;
}

module.exports = formatDate;

formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['YYYY', 'MM', 'DD', '.']);
