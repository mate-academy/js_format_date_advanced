'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateWithNoSeparator = date.split(`${oldSeparator}`);
  const convertedDate = [];
  const matchedDate = {};

  for (let i = 0; i < fromFormat.length; i++) {
    matchedDate[fromFormat[i]] = dateWithNoSeparator[i];
  }

  if ('YYYY' in matchedDate) {
    matchedDate['YY'] = matchedDate['YYYY'].slice(2);
  }

  if ('YY' in matchedDate) {
    matchedDate['YYYY'] = matchedDate['YY'] < 30 ? `20${matchedDate['YY']}` : `19${matchedDate['YY']}`;
  }

  for (const item of toFormat) {
    convertedDate.push(matchedDate[item]);
  }

  convertedDate.pop();

  return convertedDate.join(`${newSeparator}`);
}

module.exports = formatDate;
