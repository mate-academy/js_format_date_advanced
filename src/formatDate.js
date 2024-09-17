'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  let y = -1;
  let m = -1;
  let d = -1;

  for (let i = 0; i < dateArray.length; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      y = i;
    }

    if (fromFormat[i] === 'MM') {
      m = i;
    }

    if (fromFormat[i] === 'DD') {
      d = i;
    }
  }

  const arrayDateNew = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      if (fromFormat[y] === 'YY' && toFormat[i] === 'YYYY') {
        if (Number(dateArray[y]) >= 30) {
          arrayDateNew.push('19' + dateArray[y]);
        } else {
          arrayDateNew.push('20' + dateArray[y]);
        }
      } else if (fromFormat[y] === 'YYYY' && toFormat[i] === 'YY') {
        arrayDateNew.push(dateArray[y].slice(2, 4));
      } else {
        arrayDateNew.push(dateArray[y]);
      }
    }

    if (toFormat[i] === 'MM') {
      arrayDateNew.push(dateArray[m]);
    }

    if (toFormat[i] === 'DD') {
      arrayDateNew.push(dateArray[d]);
    }
  }

  const result = arrayDateNew.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
