'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  function formatYear(neededYearFormat) {
    const keys = Object.keys(initialDate);
    const initialYear = keys.find((prop) => prop.includes('Y'));

    if (initialYear.length !== neededYearFormat.length) {
      if (initialYear.length === 2) {
        if (initialDate[initialYear] < 30) {
          return `20${initialDate[initialYear]}`;
        } else {
          return `19${initialDate[initialYear]}`;
        }
      } else {
        return initialDate[initialYear].slice(2);
      }
    }

    return initialDate[initialYear];
  }

  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const partsOfDate = date.split(fromSeparator);
  const initialDate = {};
  const result = [];

  for (let i = 0; i < partsOfDate.length; i++) {
    initialDate[fromFormat[i]] = partsOfDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      result.push(formatYear(toFormat[i]));
    } else {
      result.push(initialDate[toFormat[i]]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
