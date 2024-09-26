'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const ZERO_YEAR = '00';
  const NINGHTEENTH_YEAR = '19';
  const THIRTIETH_YEAR = '30';
  const TWENTIETH_YEAR = '20';

  const newDate = [];

  const separateFrom = fromFormat.pop();
  const separateTo = toFormat.pop();

  const oldDate = date.split(separateFrom);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] !== 'YY' && toFormat[i] !== 'YY') {
      if (fromFormat[i] === toFormat[0]) {
        newDate[0] = oldDate[i];
      } else if (fromFormat[i] === toFormat[1]) {
        newDate[1] = oldDate[i];
      } else if (fromFormat[i] === toFormat[2]) {
        newDate[2] = oldDate[i];
      }
    } else {
      for (let j = 0; j < fromFormat.length; j++) {
        if (fromFormat[i] === 'YYYY') {
          newDate[i] = oldDate[j].slice(-2);
        } else if (fromFormat[j] === 'YY') {
          if (oldDate[j] === ZERO_YEAR) {
            newDate[i] = TWENTIETH_YEAR + oldDate[j];
          } else if (+oldDate[j] < THIRTIETH_YEAR) {
            newDate[i] = oldDate[j] + oldDate[j];
          } else if (+oldDate[j] >= THIRTIETH_YEAR) {
            newDate[i] = NINGHTEENTH_YEAR + oldDate[j];
          }
        }
      }
    }
  }

  return newDate.join(separateTo);
}

module.exports = formatDate;
