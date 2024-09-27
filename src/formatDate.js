'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.at(-1);
  const toSeparator = toFormat.at(-1);
  const dateArr = date.split(fromSeparator);
  const dateObj = {};
  const newDate = [];

  for (let i = 0; i < dateArr.length; i++) {
    if (fromFormat[i] === 'YY') {
      dateObj['YYYY'] = +dateArr[i] < 30 ? `20${dateArr[i]}` : `19${dateArr[i]}`;
    } else {
      dateObj[fromFormat[i]] = dateArr[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      newDate.push(dateObj['YYYY'].slice(-2));
    } else {
      newDate.push(dateObj[toFormat[i]]);
    }
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
