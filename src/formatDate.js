'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const getSymbol = fromFormat[3];
  const setSymbol = toFormat[3];
  const dateArr = date.split(getSymbol);
  const list = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let findIndex = toFormat.indexOf(fromFormat[i]);
    let dateIn = dateArr[i];

    if (toFormat[findIndex] !== fromFormat[i]) {
      if (toFormat[i] === 'YY') {
        findIndex = toFormat.indexOf('YY');
        dateIn = dateArr[i].split('').splice(2).join('');
      } else if (toFormat[i] === 'YYYY') {
        findIndex = toFormat.indexOf('YYYY');

        if (dateArr[i] < 30) {
          dateIn = dateArr[i].split('');
          dateIn.unshift('20');
          dateIn = dateIn.join('');
        } else if (+dateArr[i] >= 30) {
          dateIn = dateArr[i].split('');
          dateIn.unshift('19');
          dateIn = dateIn.join('');
        }
      }
    }
    list[findIndex] = dateIn;
  }

  const arrTrueDate = [];

  for (const key in list) {
    arrTrueDate.push(list[key]);
  }

  return arrTrueDate.join(setSymbol);
}

module.exports = formatDate;
