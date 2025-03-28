'use strict';

function strToDate(strDate, fromFormat) {
  let y;
  let m;
  let d;
  let aux = '';

  aux = strDate.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        y = aux[i];
        break;

      case 'YY':
        y = aux[i];
        break;

      case 'MM':
        m = aux[i];
        break;

      case 'DD':
        d = aux[i];
    }
  }

  return [y, m, d];
}

function dateToStr(date, toFormat) {
  const ret = [];
  let y = '';

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        y = date[0];

        if (y.length === 2) {
          y = +y < 30 ? '20' + y : '19' + y;
        }
        ret[i] = y;
        break;

      case 'YY':
        y = date[0];

        if (y.length > 2) {
          y = y.slice(-2);
        }
        ret[i] = y;
        break;

      case 'MM':
        ret[i] = date[1];
        break;

      case 'DD':
        ret[i] = date[2];
    }
  }

  return ret.join(toFormat[3]);
}

// formatDate(
//   '2020-02-18',
//   ['YYYY', 'MM', 'DD', '-'],
//   ['YYYY', 'MM', 'DD', '.'],
// ); // '2020.02.18'

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const dOrig = strToDate(date, fromFormat);

  const sDest = dateToStr(dOrig, toFormat);

  return sDest;
}

module.exports = formatDate;
