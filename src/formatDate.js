'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat.at(-1));

  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  if (dateObject.YY === undefined) {
    dateObject.YY = dateObject.YYYY.slice(-2);
  } else {
    dateObject.YYYY =
      dateObject.YY < 30 ? `20${dateObject.YY}` : `19${dateObject.YY}`;
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(dateObject[toFormat[i]]);
  }

  const newSeparator = toFormat.at(-1);

  return result.join(newSeparator);
}

module.exports = formatDate;
