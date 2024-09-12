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
  const result = [];
  const sign = fromFormat[fromFormat.length - 1];
  const newSign = toFormat[toFormat.length - 1];
  const dateFormatObj = {};
  const countOfY = toFormat.reduce((count, format) => {
    return count + (format.match(/Y/g) || []).length;
  }, 0);

  fromFormat.splice(0, 3).forEach((format, i) => {
    dateFormatObj[format] = date.split(sign)[i];
  });

  const { YYYY, YY } = dateFormatObj;
  let year = YY || YYYY;

  if (year.toString().length > countOfY) {
    year = year.slice(-2);
    dateFormatObj['YY'] = year;
  }

  if (year.toString().length < countOfY) {
    if (year >= 30) {
      year = `19${year}`;
      dateFormatObj['YYYY'] = year;
    } else {
      year = `20${year}`;
      dateFormatObj['YYYY'] = year;
    }
  }

  toFormat.splice(0, 3).forEach(format => {
    if (format === 'YY' || format === 'YYYY') {
      result.push(dateFormatObj[format]);
    } else if (format === 'MM') {
      result.push(dateFormatObj[format]);
    } else if (format === 'DD') {
      result.push(dateFormatObj[format]);
    }
  });

  return result.join(newSign);
}

module.exports = formatDate;
