'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const oldDate = date.split(fromSeparator);
  const newDate = [];
  const dateInfo = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateInfo[fromFormat[i]] = oldDate[i];

    if (fromFormat[i] === 'YY') {
      dateInfo.YYYY = (oldDate[i] < 30 ? '20' : '19') + oldDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      dateInfo.YY = oldDate[i].slice(2);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(dateInfo[toFormat[i]]);
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
