'use strict';

/*
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const FROM_SEPARATOR = fromFormat[fromFormat.length - 1];
  const GIVEN_DATE_PARTS = date.split(FROM_SEPARATOR);
  const CHANGED_DATE_PARTS = [];
  const GIVEN_DATE = {};

  for (let i = 0; i < GIVEN_DATE_PARTS.length; i++) {
    GIVEN_DATE[fromFormat[i]] = GIVEN_DATE_PARTS[i];
  }

  if (fromFormat.includes('YYYY')) {
    GIVEN_DATE['YY'] = GIVEN_DATE['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY')) {
    const SHORT_YEAR = parseInt(GIVEN_DATE['YY']);

    GIVEN_DATE['YYYY'] = SHORT_YEAR < 30
      ? `20${GIVEN_DATE['YY']}`
      : `19${GIVEN_DATE['YY']}`;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    CHANGED_DATE_PARTS.push(GIVEN_DATE[toFormat[i]]);
  }

  const CHANGED_DATE = CHANGED_DATE_PARTS.join(toFormat[toFormat.length - 1]);

  return CHANGED_DATE;
}

module.exports = formatDate;
