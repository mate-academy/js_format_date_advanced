'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const separatorNew = toFormat[toFormat.length - 1];

  const arrDate = date.split(separator);

  const newDate = {};

  for (let i = 0; i < arrDate.length; i++) {
    newDate[fromFormat[i]] = arrDate[i];
  }

  if ('YYYY' in newDate) {
    newDate.YY = newDate.YYYY.slice(-2);
  } else if (newDate.YY < 30) {
    newDate.YYYY = `20${newDate.YY}`;
  } else {
    newDate.YYYY = `19${newDate.YY}`;
  }

  const orderedDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    orderedDate.push(newDate[toFormat[i]]);
  }

  const formattedDate = orderedDate.join(separatorNew);

  return formattedDate;
}

module.exports = formatDate;
