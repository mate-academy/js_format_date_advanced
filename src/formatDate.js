'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const arrayDate = date.split(fromSeparator);
  const formattedDate = {};
  const result = new Array(toFormat.length - 1);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    formattedDate[fromFormat[i]] = arrayDate[i];
  }

  if (formattedDate.hasOwnProperty('YYYY')) {
    formattedDate['YY'] = formattedDate['YYYY'].slice(2);
  } else {
    const year = formattedDate['YY'];

    formattedDate['YYYY'] = year < 30 ? `20${year}` : `19${year}`;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result[i] = formattedDate[toFormat[i]];
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
