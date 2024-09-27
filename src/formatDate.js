'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedDate = date.split(fromFormat[3]);
  const separator = toFormat[3];
  const expandedDateFrom = {};
  const expandedDateTo = {};
  let resultDate = [];

  const FULL_YEAR = 'YYYY';
  const SHORT_YEAR = 'YY';
  const TWENTIES = '20';
  const NINETEENTH = '19';
  const YEAR_DIVIDER = 30;

  for (let i = 0; i < 3; i++) {
    expandedDateFrom[fromFormat[i]] = splittedDate[i];
    expandedDateTo[toFormat[i]] = undefined;
  }

  for (const key in expandedDateFrom) {
    if (key in expandedDateTo) {
      expandedDateTo[key] = expandedDateFrom[key];
    }
  }

  if (expandedDateFrom[SHORT_YEAR] && !(expandedDateTo[SHORT_YEAR])) {
    if (expandedDateFrom[SHORT_YEAR] < YEAR_DIVIDER) {
      expandedDateTo[FULL_YEAR] = TWENTIES + expandedDateFrom[SHORT_YEAR];
    } else {
      expandedDateTo[FULL_YEAR] = NINETEENTH + expandedDateFrom[SHORT_YEAR];
    }
  }

  if (expandedDateFrom[FULL_YEAR] && !(expandedDateTo[FULL_YEAR])) {
    expandedDateTo[SHORT_YEAR] = expandedDateFrom[FULL_YEAR].slice(2);
  }

  resultDate = Object.values(expandedDateTo);

  return resultDate.join(separator);
}

module.exports = formatDate;
