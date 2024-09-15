'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const YEAR_IDENTIFIER = 'Y';
  const MONTH_IDENTIFIER = 'M';
  const DAY_IDENTIFIER = 'D';
  const SEPARATOR_INDEX = 3;
  const YEAR_MAX_LIMIT = 30;
  const splitDate = date.split(fromFormat[SEPARATOR_INDEX]);
  const resultDate = [];
  const oldFormat = dateFormatToObject(fromFormat,
    YEAR_IDENTIFIER,
    MONTH_IDENTIFIER,
    DAY_IDENTIFIER);
  const newFormat = dateFormatToObject(toFormat,
    YEAR_IDENTIFIER,
    MONTH_IDENTIFIER,
    DAY_IDENTIFIER);

  resultDate[newFormat[YEAR_IDENTIFIER]]
    = splitDate[oldFormat[YEAR_IDENTIFIER]];

  if (toFormat[newFormat[YEAR_IDENTIFIER]].length
    > resultDate[newFormat[YEAR_IDENTIFIER]].length) {
    if (+resultDate[newFormat[YEAR_IDENTIFIER]] < YEAR_MAX_LIMIT) {
      resultDate[newFormat[YEAR_IDENTIFIER]]
        = '20' + resultDate[newFormat[YEAR_IDENTIFIER]];
    } else {
      resultDate[newFormat[YEAR_IDENTIFIER]]
        = '19' + resultDate[newFormat[YEAR_IDENTIFIER]];
    }
  }

  if (toFormat[newFormat[YEAR_IDENTIFIER]].length
    < resultDate[newFormat[YEAR_IDENTIFIER]].length) {
    resultDate[newFormat[YEAR_IDENTIFIER]]
        = resultDate[newFormat[YEAR_IDENTIFIER]].slice(2);
  }

  resultDate[newFormat[MONTH_IDENTIFIER]]
    = splitDate[oldFormat[MONTH_IDENTIFIER]];

  resultDate[newFormat[DAY_IDENTIFIER]]
    = splitDate[oldFormat[DAY_IDENTIFIER]];

  return resultDate.join(toFormat[SEPARATOR_INDEX]);
}

function dateFormatToObject(dateFormat,
  YEAR_IDENTIFIER,
  MONTH_IDENTIFIER,
  DAY_IDENTIFIER) {
  const dateObj = {};

  for (let i = 0; i < dateFormat.length; i++) {
    if (dateFormat[i].includes(YEAR_IDENTIFIER)) {
      dateObj[YEAR_IDENTIFIER] = i;
    }

    if (dateFormat[i].includes(MONTH_IDENTIFIER)) {
      dateObj[MONTH_IDENTIFIER] = i;
    }

    if (dateFormat[i].includes(DAY_IDENTIFIER)) {
      dateObj[DAY_IDENTIFIER] = i;
    }
  }

  return dateObj;
}
module.exports = formatDate;
