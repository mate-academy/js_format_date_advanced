'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(/[-:/:.]/);
  const toFormatSliced = toFormat.slice(0, -1);
  const separator = toFormat[3];
  const newDate = [];
  const mapDate = {
    [fromFormat[0]]: dateArr[0],
    [fromFormat[1]]: dateArr[1],
    [fromFormat[2]]: dateArr[2],
  };

  for (let i = 0; i < toFormatSliced.length; i++) {
    const arrayElement = toFormatSliced[i];

    for (const key in mapDate) {
      if (arrayElement === key) {
        newDate.push(mapDate[key]);
      } else if (arrayElement === 'YYYY'
      && key === 'YY' && mapDate[key] >= 30) {
        newDate.push('19' + mapDate[key]);
      } else if (arrayElement === 'YYYY'
      && key === 'YY' && mapDate[key] < 30) {
        newDate.push('20' + mapDate[key]);
      } else if (arrayElement === 'YY'
      && key === 'YYYY') {
        newDate.push(mapDate[key].slice(2));
      }
    }
  }

  return newDate.join(separator);
}

module.exports = formatDate;
