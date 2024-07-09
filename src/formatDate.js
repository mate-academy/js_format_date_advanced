'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // we have learned split symbol
  const splitSymbol = fromFormat[fromFormat.length - 1];

  // create an Array that has all number of a date
  const numbers = date.split(splitSymbol);

  const recieveFormat = {};
  const needFormat = {};

  // we have write valid formats and valid order as the keys in the empty object
  for (let i = 0; i < toFormat.length - 1; i++) {
    needFormat[toFormat[i]] = '';
  }

  // here we have write parts of date into corresponding symbols
  for (let i = 0; i < numbers.length; i++) {
    recieveFormat[fromFormat[i]] = numbers[i];
  }

  for (const key in recieveFormat) {
    for (let i = 0; i < toFormat.length; i++) {
      // we take symbol from 'toFormat' and look if it cointain in key
      // we have wrote parts of date into corresponding properties or symbols
      // 'needFormat' is an object have keys as symbols of date and walues
      // as parts of date in accordance
      if (key.includes(toFormat[i][0])) {
        needFormat[toFormat[i]] = recieveFormat[key];
      }
    }
  }
  // we make short properties longer and long properties shorter if we need
  // a long story short we fix year date

  for (const key in needFormat) {
    if (key === 'YY') {
      needFormat['YY'] = needFormat['YY'][2] + needFormat['YY'][3];
    }

    if (key === 'YYYY' && needFormat[key] < 30) {
      needFormat[key] = '20' + needFormat[key];
    }

    if (key === 'YYYY' && needFormat[key].length < 4) {
      needFormat[key] = '19' + needFormat[key];
    }
  }

  const arrData = [];

  for (const key in needFormat) {
    // we push into empty array parts of date in valid order allready
    arrData.push(needFormat[key]);
  }
  // we join it with last symbol of 'toFormat'

  return arrData.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
