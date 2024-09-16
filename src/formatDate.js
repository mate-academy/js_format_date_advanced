'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(`${fromFormat[fromFormat.length - 1]}`);
  let day = '';
  let mounth = '';
  let yearShort = '';
  let yearLong = '';
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD' :
        day = dateArr[i];
        break;
      case 'MM' :
        mounth = dateArr[i];
        break;
      case 'YY':
        yearShort = dateArr[i];

        if (Number(dateArr[i]) < 30) {
          yearLong = '20' + yearShort;
        } else {
          yearLong = '19' + yearShort;
        }
        break;
      case 'YYYY':
        yearLong = dateArr[i];
        yearShort = yearLong.slice(2);
        break;
    }
  }

  for (let q = 0; q < toFormat.length - 1; q++) {
    switch (toFormat[q]) {
      case 'DD' :
        result.push(day);
        break;
      case 'MM' :
        result.push(mounth);
        break;
      case 'YY':
        result.push(yearShort);
        break;
      case 'YYYY':
        result.push(yearLong);
        break;
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
