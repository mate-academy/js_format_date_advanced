'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateArr = date.split(fromSeparator);
  const result = [];

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < dateArr.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = dateArr[i];
        break;

      case 'YY':
        if (Number(dateArr[i]) < 30) {
          year = '20' + dateArr[i];
        } else {
          year = '19' + dateArr[i];
        }
        break;

      case 'MM':
        month = dateArr[i];
        break;

      case 'DD':
        day = dateArr[i];
        break;
    }
  }

  for (const format of toFormat) {
    switch (format) {
      case 'YYYY':
        result.push(year);
        break;

      case 'YY':
        result.push(year.slice(2));
        break;

      case 'MM':
        result.push(month);
        break;

      case 'DD':
        result.push(day);
        break;
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
