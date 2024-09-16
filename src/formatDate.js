'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = date.split(`${fromFormat[3]}`);
  const result = [];
  
  const currentData = (data) => {
    return newDate[fromFormat.indexOf(data)];
  };

  for (const value of toFormat) {
    switch (value) {
      case 'DD':
        result.push(currentData(value));
        break;
      case 'MM':
        result.push(currentData(value));
        break;
      case 'YYYY':
        if (fromFormat.indexOf(value) === -1) {
          let century = 19;

          if (+currentData('YY') < 30) {
            century = 20;
          }

          result.push(century + currentData('YY'));
        } else {
          result.push(currentData(value));
        }
        break;
      case 'YY':
        if (fromFormat.indexOf(value) === -1) {
          result.push(currentData('YYYY').slice(2, 4));
        } else {
          result.push(currentData(value));
        }
        break;
      default:
        break;
    }
  }

  return result.join(`${toFormat[3]}`);
}

module.exports = formatDate;
