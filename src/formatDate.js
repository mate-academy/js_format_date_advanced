'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , oldSeparator] = fromFormat;
  const [, , , newSeparator] = toFormat;

  const dateObject = {};
  const result = [];
  const fromSplited = date.split(oldSeparator);

  for (let i = 0; i < fromSplited.length; i++) {
    dateObject[fromFormat[i]] = fromSplited[i];
  }

  if ('YYYY' in dateObject) {
    dateObject['YY'] = dateObject['YYYY'].slice(2);
  }

  dateObject['YYYY'] = +dateObject['YY'] < 30 ? `20${dateObject['YY']}` : `19${dateObject['YY']}`;

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateObject[toFormat[i]]);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
