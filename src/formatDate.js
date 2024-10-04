'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const objToFormat = {};
  const objFromFormat = {};
  const newFormat = [];
  const getLastTwoDigits = (num) => {
    return num % 100;
  };

  for (let i = 0; i < toFormat.length - 1; i++) {
    objToFormat[toFormat[i]] = i;
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objFromFormat[fromFormat[i]] = i;
  }

  for (const [toKey, toValue] of Object.entries(objToFormat)) {
    for (const [fromKey, fromValue] of Object.entries(objFromFormat)) {
      switch (true) {
        case fromKey === toKey:
          newFormat[toValue] = dateArr[fromValue];
          break;

        case toKey === 'YY' && fromKey === 'YYYY':
          newFormat[toValue] = getLastTwoDigits(+dateArr[fromValue]);
          break;

        case toKey === 'YYYY' && fromKey === 'YY':
          if (+dateArr[fromValue] < 30) {
            newFormat[toValue] = 2000 + +dateArr[fromValue];
          } else {
            newFormat[toValue] = 1900 + +dateArr[fromValue];
          }
          break;
      }
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
