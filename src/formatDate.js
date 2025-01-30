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
  let newDateString = '';
  const newDateObj = {};
  const newDateArr = [];
  const dateArr = date.split(fromFormat[3]);
  const newJoinSymbol = toFormat[3];

  toFormat.length = 3;

  for (let i = 0; i < 3; i++) {
    newDateObj[fromFormat[i]] = dateArr[i];
  }

  if (
    (fromFormat.includes('YYYY') && toFormat.includes('YYYY')) ||
    (fromFormat.includes('YY') && toFormat.includes('YY'))
  ) {
    for (const el of toFormat) {
      newDateArr.push(newDateObj[el]);
    }
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (parseInt(newDateObj['YY']) >= 30) {
      newDateObj['YYYY'] = '19' + newDateObj['YY'];
    } else {
      newDateObj['YYYY'] = '20' + newDateObj['YY'];
    }

    for (const el of toFormat) {
      newDateArr.push(newDateObj[el]);
    }
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    newDateObj['YY'] = newDateObj['YYYY'].slice(-2);

    for (const el of toFormat) {
      newDateArr.push(newDateObj[el]);
    }
  }

  newDateString = newDateArr.join(newJoinSymbol);

  return newDateString;
}

module.exports = formatDate;
