'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSep = fromFormat[3];
  const newSep = toFormat[3];
  const splitedDate = date.split(oldSep);
  const newDate = [];
  let getYear, getMonth, getDay;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      getYear = splitedDate[i];
    } else if (fromFormat[i] === 'DD') {
      getDay = splitedDate[i];
    } else if (fromFormat[i] === 'MM') {
      getMonth = splitedDate[i];
    }
  }

  for (let i = 0; i < fromFormat.length; i++) {
    for (let j = 0; j < toFormat.length; j++) {
      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        getYear = getYear.split('').splice(2, 2).join('');
      } else if (fromFormat[i] === 'YY'
                && toFormat[j] === 'YYYY'
                && getYear > 21) {
        getYear = `19${getYear}`;
      } else if (fromFormat[i] === 'YY'
                && toFormat[j] === 'YYYY'
                && getYear <= 21) {
        getYear = `20${getYear}`;
      }
    }
  }

  for (let i = 0; i < splitedDate.length; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      newDate.push(getYear);
    } else if (toFormat[i] === 'DD') {
      newDate.push(getDay);
    } else if (toFormat[i] === 'MM') {
      newDate.push(getMonth);
    }
  }

  return newDate.join(newSep);
}

module.exports = formatDate;
