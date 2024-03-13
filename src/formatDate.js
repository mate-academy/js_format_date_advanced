'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const dateArray = date.split(oldSeparator);
  const dateObject = {};
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  for (const key of toFormat) {
    if (dateObject[key]) {
      newDate.push(dateObject[key]);
    }

    if (key === 'YY') {
      newDate.push(dateObject.YYYY.slice(2));
    }

    if (key === 'YYYY') {
      if (dateObject.YY < 30) {
        newDate.push('20' + dateObject.YY);
      }

      if (dateObject.YY >= 30) {
        newDate.push('19' + dateObject.YY);
      }
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
