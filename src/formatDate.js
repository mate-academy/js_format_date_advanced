'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const dateObject = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  if (dateObject.YYYY) {
    dateObject.YY = dateObject.YYYY.slice(-2);
  } else if (dateObject.YY) {
    const century = Number(dateObject.YY) < 30 ? '20' : '19';

    dateObject.YYYY = century + dateObject.YY;
  }

  const formattedDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    formattedDate.push(dateObject[toFormat[i]]);
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
