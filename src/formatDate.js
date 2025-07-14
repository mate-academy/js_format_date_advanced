'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const divider = fromFormat[fromFormat.length - 1];
  const dateArr = date.split(divider);

  const formatMap = {};
  const resultParts = [];

  for (let i = 0; i < dateArr.length; i++) {
    formatMap[fromFormat[i]] = dateArr[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];

    if (part === 'YY') {
      const yy = formatMap['YY'] || formatMap['YYYY'].slice(-2);

      resultParts.push(yy);
    } else if (part === 'YYYY') {
      let yyyy = formatMap['YYYY'];

      if (!yyyy && formatMap['YY']) {
        const yy = formatMap['YY'].padStart(2, '0');

        yyyy = Number(yy) < 30 ? `20${yy}` : `19${yy}`;
      }
      resultParts.push(yyyy);
    } else {
      resultParts.push(formatMap[part]);
    }
  }

  const newDivider = toFormat[toFormat.length - 1];
  const result = resultParts.join(newDivider);

  return result;
}

module.exports = formatDate;
