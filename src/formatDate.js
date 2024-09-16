'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const CENTURY_SEPARATOR = 30;
  const FORMAT_VALUES = 3;
  const YEAR_FORMAT_LONG = 'YYYY';
  const YEAR_FORMAT_SHORT = 'YY';
  const YEAR_LONG_TO_SHORT_START = 2;
  const YEAR_LONG_TO_SHORT_END = 4;

  const SEPARATOR_FROM = fromFormat[3];
  const SEPARATOR_TO = toFormat[3];
  const DATE_VALUES = date.split(SEPARATOR_FROM);

  const fromDate = {};
  const toDate = [];

  for (let i = 0; i < FORMAT_VALUES; i++) {
    fromDate[fromFormat[i]] = DATE_VALUES[i];

    if (fromFormat[i] === YEAR_FORMAT_SHORT) {
      fromDate[YEAR_FORMAT_LONG]
        = DATE_VALUES[i] < CENTURY_SEPARATOR
          ? `20${DATE_VALUES[i]}`
          : `19${DATE_VALUES[i]}`;
    }

    if (fromFormat[i] === YEAR_FORMAT_LONG) {
      fromDate[YEAR_FORMAT_SHORT]
        = DATE_VALUES[i]
          .slice(YEAR_LONG_TO_SHORT_START, YEAR_LONG_TO_SHORT_END);
    }
  }

  for (let i = 0; i < FORMAT_VALUES; i++) {
    toDate.push(fromDate[toFormat[i]]);
  }

  return toDate.join(SEPARATOR_TO);
}

module.exports = formatDate;
