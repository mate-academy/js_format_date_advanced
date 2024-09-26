'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newData = date.split(fromFormat[fromFormat.length - 1]);
  const fromFormatDate = {};
  const toFormatDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    fromFormatDate[fromFormat[i]] = newData[i];
  }

  if (fromFormatDate.hasOwnProperty('YYYY')) {
    fromFormatDate.YY = fromFormatDate.YYYY.slice(2);
  }

  if (fromFormatDate.YY >= 30) {
    fromFormatDate.YYYY = `19${fromFormatDate.YY}`;
  } else {
    fromFormatDate.YYYY = `20${fromFormatDate.YY}`;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    toFormatDate.push(fromFormatDate[toFormat[i]]);
  }

  return toFormatDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
