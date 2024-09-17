'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DATE_ARR = date.split(fromFormat[3]);
  const SEPARATOR = toFormat[3];
  const dateObject = {};

  for (let i = 0; i < DATE_ARR.length; i++) {
    dateObject[fromFormat[i]] = DATE_ARR[i];
  }

  const formatedDate = {};

  for (const key in dateObject) {
    const part = dateObject[key];

    if (toFormat.includes(key)) {
      formatedDate[key] = part;
    };

    if (!toFormat.includes(key)) {
      if (key.length === 2 && part < 30) {
        formatedDate['YYYY'] = `20${part}`;
      }

      if (key.length === 2 && part >= 30) {
        formatedDate['YYYY'] = `19${part}`;
      }

      if (key.length === 4) {
        formatedDate['YY'] = `${part.charAt(2)}${part.charAt(3)}`;
      }
    };
  }

  return toFormat
    .map(el => formatedDate[el])
    .filter(el => el !== undefined)
    .join(SEPARATOR);
}

module.exports = formatDate;
