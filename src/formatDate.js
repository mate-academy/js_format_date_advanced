'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = toFormat[3];
  const dateToArray = date.split(fromFormat[3]);
  const fromDates = {};
  const toDates = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    fromDates[fromFormat[i]] = dateToArray[i];
    toDates[toFormat[i]] = 0;
  }

  let keyYearFrom = '';

  for (const key in fromDates) {
    if (key.includes('YY')) {
      keyYearFrom = key;
    }
  }

  let keyYearTo = '';

  for (const key in toDates) {
    if (key.includes('YY')) {
      keyYearTo = key;
    }
  }

  if (keyYearFrom.length > keyYearTo.length) {
    fromDates[keyYearTo] = fromDates[keyYearFrom].toString().slice(2);
  }

  fromDates[keyYearTo] = keyYearFrom.length < keyYearTo.length && fromDates[keyYearFrom] < 30 ? `20${fromDates[keyYearFrom]}`
    : fromDates[keyYearTo];

  fromDates[keyYearTo] = keyYearFrom.length < keyYearTo.length && fromDates[keyYearFrom] >= 30 ? `19${fromDates[keyYearFrom]}`
    : fromDates[keyYearTo];

  return `${fromDates[toFormat[0]]}${separator}` + `${fromDates[toFormat[1]]}${separator}` + `${fromDates[toFormat[2]]}`;
}

module.exports = formatDate;
