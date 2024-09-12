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
  const resultArr = [];
  const dateArr = date.split(fromFormat[3]);
  const yearIndex = fromFormat.indexOf('YYYY');
  const yearIndexShort = fromFormat.indexOf('YY');
  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');

  for (const key of toFormat) {
    if (key === 'DD') {
      resultArr.push(dateArr[dayIndex]);
    }

    if (key === 'MM') {
      resultArr.push(dateArr[monthIndex]);
    }

    if (key === 'YYYY') {
      if (dateArr[yearIndex]) {
        resultArr.push(dateArr[yearIndex]);
      } else {
        if (+dateArr[yearIndexShort] > 20) {
          resultArr.push(`19${dateArr[yearIndexShort]}`);
        } else {
          resultArr.push(`20${dateArr[yearIndexShort]}`);
        }
      }
    }

    if (key === 'YY') {
      if (dateArr[yearIndexShort]) {
        resultArr.push(dateArr[yearIndexShort]);
      } else {
        resultArr.push(dateArr[yearIndex].slice(2));
      }
    }
  }

  return resultArr.join(toFormat[3]);
}

module.exports = formatDate;
