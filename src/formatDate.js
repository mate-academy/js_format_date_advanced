'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const DateArray = date.split(fromSeparator);
  const dateObject = {};

  for (let i = 0; i < DateArray.length; i++) {
    dateObject[fromFormat[i]] = DateArray[i];
  }

  if (dateObject['YYYY'] && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  } else if (dateObject['YY'] && toFormat.includes('YYYY')) {
    dateObject['YYYY'] = dateObject['YY'] < 30
      ? '20' + dateObject['YY']
      : '19' + dateObject['YY'];
  }

  return toFormat.map(part => dateObject[part]).join(toSeparator);
}

module.exports = formatDate;
