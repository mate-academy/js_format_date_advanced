'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const tempDate = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('YYYY')) {
      for (let j = 0; j < toFormat.length - 1; j++) {
        if (toFormat[j].includes('YYYY')) {
          newDate[j] = +tempDate[i];
        // eslint-disable-next-line max-len
        } else if (toFormat[j].includes('YY') && tempDate[i] > 1900 && tempDate[i] < 2000) {
          newDate[j] = +tempDate[i] - 1900;
        } else if (toFormat[j].includes('YY') && tempDate[i] >= 2000) {
          newDate[j] = +tempDate[i] - 2000;
        }
      }
    }

    if (fromFormat[i].includes('YY') && fromFormat[i].length === 2) {
      for (let j = 0; j < toFormat.length - 1; j++) {
        if (toFormat[j].includes('YY') && toFormat[j].length === 2) {
          newDate[j] = +tempDate[i];
        } else if (toFormat[j].includes('YYYY') && tempDate[i] < 30) {
          newDate[j] = +tempDate[i] + 2000;
        } else if (toFormat[j].includes('YYYY') && tempDate[i] >= 30) {
          newDate[j] = +tempDate[i] + 1900;
        }
      }
    }

    if (fromFormat[i].includes('MM')) {
      for (let j = 0; j < toFormat.length - 1; j++) {
        if (toFormat[j].includes('MM')) {
          newDate[j] = tempDate[i];
        }
      }
    }

    if (fromFormat[i].includes('DD')) {
      for (let j = 0; j < toFormat.length - 1; j++) {
        if (toFormat[j].includes('DD')) {
          newDate[j] = tempDate[i];
        }
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
