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
  const dateParts = date.split(fromSeparator);
  const dateSet = {};

  for (let i = 0; i < dateParts.length; i++) {
    dateSet[fromFormat[i]] = dateParts[i];
  }

  const newDate = [];

  for (const key of toFormat) {
    if (dateSet[key]) {
      newDate.push(dateSet[key]);
    } else if (key === 'YY') {
      newDate.push(dateSet.YYYY.slice(2));
    } else if (key === 'YYYY') {
      if (dateSet.YY < 30) {
        newDate.push('20' + dateSet.YY);
      } else {
        newDate.push('19' + dateSet.YY);
      }
    }
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
