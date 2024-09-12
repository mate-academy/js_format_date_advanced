'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArr = date.split(oldSeparator);
  let day, month, year;
  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateArr[i];
        break;

      case 'MM':
        month = dateArr[i];
        break;

      case 'YYYY':
        year = dateArr[i];
        break;

      case 'YY':
        year = dateArr[i];
        break;
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    switch (toFormat[j]) {
      case 'DD':
        result.push(day);
        break;

      case 'MM':
        result.push(month);
        break;

      case 'YY':
        if (year.length > toFormat[j].length) {
          result.push(year.slice(-2));
        }
        break;

      case 'YYYY':
        if (year.length === toFormat[j].length) {
          result.push(year);
        } else {
          const fullYear = +year < 30 ? '20'.concat(year) : '19'.concat(year);

          result.push(fullYear);
        }
        break;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
