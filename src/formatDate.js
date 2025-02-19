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
  const oldDateSeparator = fromFormat[3];
  const splitFromFormat = date.split(oldDateSeparator);
  const newFormatDate = [];
  const year = [];
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year.push(splitFromFormat[i]);
        break;

      case 'MM':
        month = splitFromFormat[i];
        break;

      case 'DD':
        day = splitFromFormat[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
      case 'YYYY':
        const yearNewFormatLength = toFormat[i].length;

        if (year[0].length === yearNewFormatLength) {
          newFormatDate.push(...year);
        } else if (year[0].length > yearNewFormatLength) {
          newFormatDate.push(year[0].slice(2));
        } else if (year[0].length < yearNewFormatLength && +year[0] < 30) {
          year.unshift(20);
          newFormatDate.push(year.join(''));
        } else if (+year[0] === 30 || +year[0] > 30) {
          year.unshift(19);
          newFormatDate.push(year.join(''));
        }
        break;

      case 'MM':
        newFormatDate.push(month);
        break;

      case 'DD':
        newFormatDate.push(day);
        break;

      default:
        break;
    }
  }

  return newFormatDate.join(toFormat[3]);
}

module.exports = formatDate;
