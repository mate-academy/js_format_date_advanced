'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
const YEAR_INDICATOR = 'Y';
const CENTURY_INDICATOR = 30;

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const splited = date.split(oldSeparator);
  const oldDate = {};
  const newDate = [];

  for (let i = 0; i < splited.length; i++) {
    oldDate[fromFormat[i]] = splited[i];
  }

  for (let i = 0; i < splited.length; i++) {
    if (toFormat[i].includes(YEAR_INDICATOR)) {
      const oldFormat = Object.keys(oldDate).find((item) => {
        return item.includes(YEAR_INDICATOR);
      });
      const newFormat = toFormat[i];
      const year = oldDate[oldFormat];

      newDate.push(getCorrectYear(year, oldFormat, newFormat));
      continue;
    }

    newDate.push(oldDate[toFormat[i]]);
  }

  return newDate.join(newSeparator);
}

function getCorrectYear(year, oldFormat, newFormat) {
  if (oldFormat.length === newFormat.length) {
    return year;
  }

  if (newFormat.length === 2) {
    return year.slice(-2);
  }

  if (newFormat.length === 4) {
    return +year >= CENTURY_INDICATOR ? `19${year}` : `20${year}`;
  }
}

module.exports = formatDate;
