'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormat = [];

  const separateFrom = fromFormat[fromFormat.length - 1];
  const separateTo = toFormat[toFormat.length - 1];
  const dateArr = date.split(separateFrom);

  const fromY = fromFormat.findIndex((item) => item.includes('Y'));
  const fromM = fromFormat.findIndex((item) => item.includes('M'));
  const fromD = fromFormat.findIndex((item) => item.includes('D'));

  const toY = toFormat.findIndex((item) => item.includes('Y'));
  const toM = toFormat.findIndex((item) => item.includes('M'));
  const toD = toFormat.findIndex((item) => item.includes('D'));

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (i === toY) {
      if (fromFormat[fromY] === 'YY' && toFormat[toY] === 'YYYY') {
        if (Number(dateArr[fromY]) < 30) {
          newFormat[toY] = `20${dateArr[fromY]}`;
        } else {
          newFormat[toY] = `19${dateArr[fromY]}`;
        }
      }

      if (fromFormat[fromY] === 'YYYY' && toFormat[toY] === 'YY') {
        newFormat[toY] = dateArr[fromY].slice(-2);
      }

      if (fromFormat[fromY] === 'YYYY' && toFormat[toY] === 'YYYY') {
        newFormat[toY] = dateArr[fromY];
      }
    }

    if (i === toM) {
      newFormat[toM] = dateArr[fromM];
    }

    if (i === toD) {
      newFormat[toD] = dateArr[fromD];
    }
  }

  return newFormat.join(separateTo);
}

module.exports = formatDate;
