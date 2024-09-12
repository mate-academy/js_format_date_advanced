'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [0, 0, 0];
  const dateInfo = {};

  let year = 0;

  for (let i = 0; i < dateParts.length; i++) {
    const key = fromFormat[i];

    dateInfo[key] = dateParts[i];
  }

  for (let i = 0; i < dateParts.length; i++) {
    for (const key in dateInfo) {
      if (toFormat[i] === 'YY' && dateInfo[key].length === 4) {
        newDate[toFormat.indexOf('YY')] = dateInfo[key].slice(-2);
      }

      if (toFormat[i].includes(key)) {
        let value = dateInfo[key];

        if (key === 'YY' && value.length === 2) {
          year = value < 30 ? 20 : 19;
          value = year + value;
        }

        newDate[toFormat.indexOf(toFormat[i])] = value;
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
