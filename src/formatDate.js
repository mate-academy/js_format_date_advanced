'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newArr = [];
  const dateSplit = date.split(fromFormat[3]);
  const day = dateSplit[fromFormat.indexOf('DD')];
  const month = dateSplit[fromFormat.indexOf('MM')];

  if (fromFormat.indexOf('YYYY') !== -1 && toFormat.indexOf('YYYY') !== -1) {
    newArr[toFormat.indexOf('YYYY')] = dateSplit[fromFormat.indexOf('YYYY')];
  }

  if (fromFormat.indexOf('YY') !== -1 && toFormat.indexOf('YYYY') !== -1) {
    if (dateSplit[fromFormat.indexOf('YY')] < 30) {
      newArr[toFormat.indexOf('YYYY')] =
        '20' + dateSplit[fromFormat.indexOf('YY')];
    } else {
      newArr[toFormat.indexOf('YYYY')] =
        '19' + dateSplit[fromFormat.indexOf('YY')];
    }
  }

  if (fromFormat.indexOf('YYYY') !== -1 && toFormat.indexOf('YY') !== -1) {
    newArr[toFormat.indexOf('YY')] =
      dateSplit[fromFormat.indexOf('YYYY')].slice(-2);
  }

  if (fromFormat.indexOf('YY') !== -1 && toFormat.indexOf('YY') !== -1) {
    newArr[toFormat.indexOf('YY')] = dateSplit[fromFormat.indexOf('YY')];
  }

  newArr[toFormat.indexOf('DD')] = day;
  newArr[toFormat.indexOf('MM')] = month;

  return newArr.join(toFormat[3]);
}

module.exports = formatDate;
