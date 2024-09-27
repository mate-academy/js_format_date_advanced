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
  const tmpDate = date.split(fromFormat[3]);
  const newDate = [];
  let year = '';

  if (toFormat.indexOf('YYYY') !== -1) {
    if (fromFormat.indexOf('YYYY') !== -1) {
      year = tmpDate[fromFormat.indexOf('YYYY')];
    } else {
      const tmpYear = tmpDate[fromFormat.indexOf('YY')];

      if (tmpYear >= 30) {
        year = '19' + tmpYear;
      } else {
        year = '20' + tmpYear;
      }
    }
  } else {
    if (fromFormat.indexOf('YYYY') === -1) {
      year = tmpDate[toFormat.indexOf('YY')];
    } else {
      year = tmpDate[fromFormat.indexOf('YYYY')].slice(-2);
    }
  }

  toFormat.forEach((el, i) => {
    switch (el) {
      case 'DD':
        newDate[i] = tmpDate[fromFormat.indexOf('DD')];
        break;
      case 'MM':
        newDate[i] = tmpDate[fromFormat.indexOf('MM')];
        break;
      case 'YY':
      case 'YYYY':
        newDate[i] = year;
        break;
    }
  });

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
