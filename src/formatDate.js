'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const resultDate = [];
  const separators = [fromFormat.pop(), toFormat.pop()];
  const arrOfDateParts = date.split(`${separators[0]}`);

  fromFormat.map((part, ind) => {
    switch (part) {
      case 'DD':
        resultDate[toFormat.indexOf(part)] = arrOfDateParts[ind];
        break;

      case 'MM':
        resultDate[toFormat.indexOf(part)] = arrOfDateParts[ind];
        break;

      case 'YYYY':
        if (toFormat.indexOf(part) !== -1) {
          resultDate[toFormat.indexOf(part)] = arrOfDateParts[ind];
        } else {
          resultDate[toFormat.indexOf('YY')] = arrOfDateParts[ind].slice(2);
        }
        break;

      case 'YY':
        if (toFormat.indexOf(part) !== -1) {
          resultDate[toFormat.indexOf(part)] = arrOfDateParts[ind];
        } else {
          if (+arrOfDateParts[ind] < 30) {
            resultDate[toFormat.indexOf('YYYY')] = '20' + arrOfDateParts[ind];
          } else {
            resultDate[toFormat.indexOf('YYYY')] = '19' + arrOfDateParts[ind];
          }
        }
        break;

      default: break;
    };
  });

  return resultDate.join(`${separators[1]}`);
}

module.exports = formatDate;
