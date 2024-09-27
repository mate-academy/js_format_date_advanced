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

  const fromDate = date.split(fromSeparator);
  const toDate = [];

  const dateObject = {};

  for (let i = 0; i < fromDate.length; i++) {
    dateObject[fromFormat[i]] = fromDate[i];
  }

  if (dateObject.hasOwnProperty('YYYY')) {
    dateObject.YY = dateObject.YYYY.slice(-2);
  } else {
    dateObject.YYYY = (dateObject.YY < 30)
      ? '20' + dateObject.YY
      : '19' + dateObject.YY;
  }

  for (const template of toFormat) {
    if (template === toSeparator) {
      break;
    }

    toDate.push(dateObject[template]);
  }

  return toDate.join(toSeparator);
}

module.exports = formatDate;
