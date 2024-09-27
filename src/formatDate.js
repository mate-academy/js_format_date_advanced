'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // console.log(date);
  // console.log(fromFormat);
  // console.log(toFormat);
  const newDate = [];

  const separatorFromFormat = fromFormat[fromFormat.length - 1];
  const separatorToFormat = toFormat[toFormat.length - 1];
  const oldDate = date.split(separatorFromFormat);

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] !== 'YY' && fromFormat[i] !== 'YY') {
      if (fromFormat[i] === toFormat[0]) {
        newDate[0] = oldDate[i];
      } else if (fromFormat[i] === toFormat[1]) {
        newDate[1] = oldDate[i];
      } else if (fromFormat[i] === toFormat[2]) {
        newDate[2] = oldDate[i];
      }
    } else {
      for (let j = 0; j < fromFormat.length; j++) {
        if (toFormat[j] === 'YY') {
          newDate[j] = oldDate[j].slice(2);
        } else if (fromFormat[j] === 'YY') {
          if (oldDate[j] === '00') {
            newDate[i] = '20' + oldDate[j];
          } else if (oldDate[j] < 30) {
            newDate[i] = oldDate[j] + oldDate[j];
          } else if (oldDate[j] >= 30) {
            newDate[i] = '19' + oldDate[j];
          }
        }
      }
    }
  }

  return newDate.join(separatorToFormat);
}

module.exports = formatDate;
