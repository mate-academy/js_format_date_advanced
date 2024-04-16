'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormat = [];
  const dateObj = {};
  const fromSeperator = fromFormat.pop();
  const dateArray = date.split(fromSeperator);
  const toSeperator = toFormat.pop();
  // let year, month, day;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY') {
      if (+dateArray[i] < 30) {
        dateObj['YYYY'] = `20${dateArray[i]}`;
      } else {
        dateObj['YYYY'] = `19${dateArray[i]}`;
      }
    } else {
      dateObj[fromFormat[i]] = dateArray[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
        newFormat[i] = dateObj['YYYY'].slice(2);
        break;

      case 'YYYY':
        newFormat[i] = dateObj['YYYY'];
        break;

      case 'MM':
        newFormat[i] = dateObj['MM'];
        break;

      case 'DD':
        newFormat[i] = dateObj['DD'];
        break;

      default:
        return 'Invalid Format!';
    }
  }

  return newFormat.join(toSeperator);
}

module.exports = formatDate;
