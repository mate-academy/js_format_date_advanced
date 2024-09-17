'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SHORT_YEAR = 'YY';
  const LONG_YEAR = 'YYYY';
  const DAY = 'DD';
  const MONTH = 'MM';
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];

  const dateArray = date.split(OLD_SEPARATOR);
  const dateObject = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  for (const element of toFormat) {
    if (element === DAY) {
      result.push(dateObject[DAY]);
    }

    if (element === MONTH) {
      result.push(dateObject[MONTH]);
    }

    if (element === SHORT_YEAR && dateObject.hasOwnProperty(LONG_YEAR)) {
      result.push(dateObject[LONG_YEAR].slice(2));
    }

    if (element === LONG_YEAR && dateObject.hasOwnProperty(SHORT_YEAR)) {
      if (+dateObject[SHORT_YEAR] < 30) {
        result.push(`20${dateObject[SHORT_YEAR]}`);
      } else {
        result.push(`19${dateObject[SHORT_YEAR]}`);
      }
    }

    if (element === LONG_YEAR && dateObject.hasOwnProperty(LONG_YEAR)) {
      result.push(dateObject[LONG_YEAR]);
    }
  }

  return result.join(NEW_SEPARATOR);
}

module.exports = formatDate;
