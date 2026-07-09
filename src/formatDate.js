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
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      YEAR_INDEX = i;
    }

    if (fromFormat[i] === 'MM') {
      MONTH_INDEX = i;
    }

    if (fromFormat[i] === 'DD') {
      DAY_INDEX = i;
    }
  }

  const YEAR = DATE_SPLIT[YEAR_INDEX];
  const YEAR_LEN = YEAR.length;

  for (let j = 0; j < TO_LEN; j++) {
    if (toFormat[j] === 'YYYY' && YEAR_LEN === 2) {
      let YEAR_CONVERTED = '';

      if (parseInt(YEAR) < 30) {
        YEAR_CONVERTED = '20' + YEAR;
      } else {
        YEAR_CONVERTED = '19' + YEAR;
      }

      DATE_FINAL.push(YEAR_CONVERTED);
    }

    if (
      (toFormat[j] === 'YYYY' && YEAR_LEN === 4) ||
      (toFormat[j] === 'YY' && YEAR_LEN === 2)
    ) {
      DATE_FINAL.push(YEAR);
    }

    if (toFormat[j] === 'YY' && YEAR_LEN === 4) {
      const YYYY_TO_YY = YEAR.slice(2, 4);

      DATE_FINAL.push(YYYY_TO_YY);
    }

    if (toFormat[j] === 'MM') {
      DATE_FINAL.push(DATE_SPLIT[MONTH_INDEX]);
    }

    if (toFormat[j] === 'DD') {
      DATE_FINAL.push(DATE_SPLIT[DAY_INDEX]);
    }
  }

  DATE_FINAL_JOIN = DATE_FINAL.join(toFormat[toFormat.length - 1]);

  return DATE_FINAL_JOIN;
}

module.exports = formatDate;
