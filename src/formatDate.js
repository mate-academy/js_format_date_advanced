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
  const oldDelim = fromFormat[3];
  const newDelim = toFormat[3];
  const dateToArr = date.split(oldDelim);
  const toFormatArray = [];
  const day = dateToArr[fromFormat.indexOf('DD')];
  const month = dateToArr[fromFormat.indexOf('MM')];
  const year = (fromFormat.includes('YY'))
    ? dateToArr[fromFormat.indexOf('YY')]
    : dateToArr[fromFormat.indexOf('YYYY')];

  for (let i = 0; i < dateToArr.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        toFormatArray.push(day);
        break;

      case 'MM':
        toFormatArray.push(month);
        break;

      case 'YY':
        if (year.length < 2) {
          toFormatArray.push(year);
        } else {
          toFormatArray.push(year.slice(2, 4));
        }
        break;

      case 'YYYY':
        if (year.length > 2) {
          toFormatArray.push(year);
        } else {
          if (year >= 30) {
            toFormatArray.push('19' + year);
          } else {
            toFormatArray.push('20' + year);
          }
        }
        break;
    }
  }

  return toFormatArray.join(newDelim);
}

module.exports = formatDate;
