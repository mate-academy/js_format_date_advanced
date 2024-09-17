'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formattedDate = [];
  const initialDateFormat = {};
  const initialDateToArray = date.split(fromFormat[3]);

  for (let i = 0; i < (fromFormat.length - 1); i++) {
    if (fromFormat[i] === 'YY') {
      initialDateFormat.YYYY = initialDateToArray[i] < 30
        ? `20${initialDateToArray[i]}`
        : `19${initialDateToArray[i]}`;
    }

    if (fromFormat[i] === 'YYYY') {
      initialDateFormat.YY = initialDateToArray[i].slice(2);
    }
    initialDateFormat[fromFormat[i]] = initialDateToArray[i];
  }

  for (const dateItem of toFormat.slice(0, 3)) {
    formattedDate.push(initialDateFormat[dateItem]);
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
