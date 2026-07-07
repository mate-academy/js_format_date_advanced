'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FROM_LEN = fromFormat.length;
  const TO_LEN = toFormat.length;

  const DATE_SPLIT = date.split(fromFormat[FROM_LEN - 1]);
  const DATE_FINAL = [];

  let YEAR_INDEX = 0;
  let MONTH_INDEX = 0;
  let DAY_INDEX = 0;
  let DATE_FINAL_JOIN = '';

  for (let i = 0; i < FROM_LEN; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat === 'YY'){
      YEAR_INDEX = i;
    }

    if (fromFormat[i] === 'MM') {
      MONTH_INDEX = i;
    }

    if (fromFormat[i] === 'DD') {
      DAY_INDEX = i;
    }
  }

  for (let j = 0; j < TO_LEN; j++) {
    if (fromFormat[j] === 'YYYY' || fromFormat === 'YY') {
      DATE_FINAL.push(DATE_SPLIT[YEAR_INDEX]);
    }

    if (fromFormat[j] === 'MM') {
      DATE_FINAL.push(DATE_SPLIT[MONTH_INDEX]);
    }

    if (fromFormat[j] === 'DD') {
      DATE_FINAL.push(DATE_SPLIT[DAY_INDEX]);
    }
  }

  DATE_FINAL_JOIN = DATE_FINAL.join(date[date.length - 1]);

  return DATE_FINAL_JOIN;
}

module.exports = formatDate;
