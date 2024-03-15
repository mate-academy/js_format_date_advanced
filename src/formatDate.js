'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromArr = date.split(fromFormat[3]);
  const from = {
    month: 0,
    day: 0,
    year: 0,
  };
  const resultArr = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'MM') {
      from.month = i;
    }

    if (fromFormat[i] === 'DD') {
      from.day = i;
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      from.year = i;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'MM') {
      resultArr.push(fromArr[from.month]);
    }

    if (toFormat[i] === 'DD') {
      resultArr.push(fromArr[from.day]);
    }

    if (toFormat[i] === 'YY') {
      if (fromArr[from.year].length === 2) {
        resultArr.push(fromArr[from.year]);
      } else {
        resultArr.push(fromArr[from.year].slice(-2));
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (fromArr[from.year].length === 2) {
        if (parseInt(fromArr[from.year]) < 30) {
          resultArr.push(`20` + fromArr[from.year]);
        } else {
          resultArr.push(`19` + fromArr[from.year]);
        }
      } else {
        resultArr.push(fromArr[from.year]);
      }
    }
  }

  return resultArr.join(`${toFormat[3]}`);
}

module.exports = formatDate;
