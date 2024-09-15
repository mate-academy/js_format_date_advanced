'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatCopy = [...fromFormat];
  const toFormatCopy = [...toFormat];
  const fromSeparator = fromFormatCopy.pop();
  const toSeparator = toFormatCopy.pop();
  const dateToArr = date.split(fromSeparator);
  const newDate = [];
  let year, month, dayNumber;

  for (let i = 0; i < fromFormatCopy.length; i++) {
    switch (fromFormatCopy[i]) {
      case 'YY':
        if (+dateToArr[i] < 30) {
          year = dateToArr[i].padStart(4, '20');
        } else {
          year = dateToArr[i].padStart(4, '19');
        }
        break;

      case 'YYYY':
        year = dateToArr[i];
        break;

      case 'MM':
        month = dateToArr[i];
        break;

      case 'DD':
        dayNumber = dateToArr[i];
        break;

      default:
        throw Error('Date format invalid!');
    }
  }

  for (let i = 0; i < toFormatCopy.length; i++) {
    switch (toFormatCopy[i]) {
      case 'YY':
        newDate.push(year.slice(2));
        break;

      case 'YYYY':
        newDate.push(year);
        break;

      case 'MM':
        newDate.push(month);
        break;

      case 'DD':
        newDate.push(dayNumber);
        break;

      default:
        throw Error('Date format invalid!');
    }
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
