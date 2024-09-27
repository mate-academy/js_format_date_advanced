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
  const dateArray = date.split(fromSeparator);
  const dateParts = {};
  const formatedDate = [];

  for (let i = 0; i <= fromFormat.length; i++) {
    dateParts[fromFormat[i]] = dateArray[i];
  }

  if (dateParts.hasOwnProperty('YY')) {
    dateParts.YYYY = (dateParts.YY < 30)
      ? '20' + dateParts.YY
      : '19' + dateParts.YY;
  } else {
    dateParts.YY = dateParts.YYYY.slice(2);
  }

  for (const datePart of toFormat) {
    formatedDate.push(dateParts[datePart]);
  }

  return formatedDate.join(toSeparator);
}

module.exports = formatDate;
