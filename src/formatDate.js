'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(oldSeparator);

  const newDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newDate[fromFormat[i]] = dateParts[i];
  }

  if ('YYYY' in newDate) {
    newDate.YY = newDate['YYYY'].slice(-2);
  } else if ('YY' in newDate) {
    const yy = parseInt(newDate['YY']);

    newDate['YYYY'] = yy < 30 ? `20${newDate['YY']}` : `19${newDate['YY']}`;
  }

  const formattedParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    formattedParts.push(newDate[toFormat[i]]);
  }

  const formattedDate = formattedParts.join(newSeparator);

  return formattedDate;
}

module.exports = formatDate;
