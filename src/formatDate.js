'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayData = date.split(fromFormat[3]);
  const result = [];
  let year, month, day;

  fromFormat.map((item) => {
    switch (item) {
      case 'YY':
        year = arrayData.shift();
        break;

      case 'YYYY':
        year = arrayData.shift();
        break;

      case 'MM':
        month = arrayData.shift();
        break;

      case 'DD':
        day = arrayData.shift();
        break;
    }
  });

  toFormat.map((item) => {
    switch (item) {
      case 'YY':
        if (year.length === 2) {
          result.push(year);
        } else {
          result.push(year.slice(2));
        }
        break;

      case 'YYYY':
        if (year.length === 4) {
          result.push(year);
        } else {
          if (+year < 30) {
            result.push(+year + 2000 + '');
          } else {
            result.push(+year + 1900 + '');
          }
        }
        break;

      case 'MM':
        result.push(month);
        break;

      case 'DD':
        result.push(day);
        break;
    }
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
