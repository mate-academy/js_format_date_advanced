'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const temp = {};
  let count = 0;
  const separ = fromFormat[fromFormat.length - 1];
  const dateTemp = date.split(separ);

  for (const i of dateTemp) {
    temp[fromFormat[count]] = i;
    count++;
  }

  let rez = '';

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    const year = Number(temp.YY);

    if (year >= 30) {
      temp.YYYY = 19 + temp.YY;
    } else {
      temp.YYYY = 20 + temp.YY;
    }
  }

  const neuSepar = toFormat[toFormat.length - 1];

  for (const ch of toFormat) {
    if (ch === 'MM') {
      rez += temp.MM;
      rez += neuSepar;
    } else if (ch === 'DD') {
      rez += temp.DD;
      rez += neuSepar;
    } else if (ch === 'YY') {
      if (temp.YY) {
        rez += temp.YY;
      } else {
        rez += temp.YYYY.slice(2);
      }
      rez += neuSepar;
    } else if (ch === 'YYYY') {
      if (temp.YYYY) {
        rez += temp.YYYY;
      }
      rez += neuSepar;
    }
  }
  rez = rez.slice(0, -1);

  return rez;
}

module.exports = formatDate;
