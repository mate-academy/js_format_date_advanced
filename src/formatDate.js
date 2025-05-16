'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const separator = toFormat[3];

  const newDate = [];

  const dateObj = {
    [fromFormat[0]]: dateArr[0],
    [fromFormat[1]]: dateArr[1],
    [fromFormat[2]]: dateArr[2],
  };

  for (let i = 0; i < toFormat.length; i++) {
    const formatPart = toFormat[i];

    if (formatPart === 'DD') {
      newDate.push(dateObj['DD']);
    } else if (formatPart === 'MM') {
      newDate.push(dateObj['MM']);
    } else if (formatPart === 'YY') {
      if (dateObj['YYYY']) {
        newDate.push(dateObj['YYYY'].slice(-2));
      } else if (dateObj['YY']) {
        newDate.push(dateObj['YY']);
      }
    } else if (formatPart === 'YYYY') {
      if (dateObj['YYYY']) {
        newDate.push(dateObj['YYYY']);
      } else if (dateObj['YY']) {
        const yy = parseInt(dateObj['YY'], 10);
        const fullYear = yy < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY'];

        newDate.push(fullYear);
      }
    }
  }

  return newDate.join(separator);
}

module.exports = formatDate;
