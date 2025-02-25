'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const arrDate = date.split(`${fromFormat[3]}`);
  const arrNewFormat = [];
  let yIndex = 0;
  let mIndex = 0;
  let dIndex = 0;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat.includes('YYYY')) {
      yIndex = toFormat.indexOf(fromFormat[i]);
      arrNewFormat[yIndex] = arrDate[i];
    }

    if (fromFormat[i] === 'YYYY' && toFormat.includes('YY')) {
      yIndex = toFormat.indexOf('YY');
      arrNewFormat[yIndex] = Array.from(arrDate[i]).slice(2).join('');
    }

    if (fromFormat[i] === 'YY' && toFormat.includes('YYYY')) {
      const yy = arrDate[i];

      if (yy < 30) {
        yIndex = toFormat.indexOf('YYYY');
        arrNewFormat[yIndex] = `20${arrDate[i]}`;
      } else {
        yIndex = toFormat.indexOf('YYYY');
        arrNewFormat[yIndex] = `19${arrDate[i]}`;
      }
    }

    if (fromFormat[i] === 'MM') {
      mIndex = toFormat.indexOf(fromFormat[i]);
      arrNewFormat[mIndex] = arrDate[i];
    }

    if (fromFormat[i] === 'DD') {
      dIndex = toFormat.indexOf(fromFormat[i]);
      arrNewFormat[dIndex] = arrDate[i];
    }
  }

  return arrNewFormat.join(`${toFormat[3]}`);
}

module.exports = formatDate;
