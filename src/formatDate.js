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
  const arrayDate = date.split(fromSeparator);
  const formattedDate = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    formattedDate[fromFormat[i]] = arrayDate[i];
  }

  if (formattedDate.hasOwnProperty('YY')) {
    const year = formattedDate['YY'];

    formattedDate['YYYY'] = year < 30 ? `20${year}` : `19${year}`;
  } else {
    formattedDate['YY'] = formattedDate['YYYY'].slice(2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result[i] = formattedDate[toFormat[i]];
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
