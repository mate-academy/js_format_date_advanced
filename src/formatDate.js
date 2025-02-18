'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const RESULT_ARRAY = [];
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const START_DATE_SEPARATED = date.split(OLD_SEPARATOR);
  const DATE_OBJECT = {};

  for (let i = 0; i < 3; i++) {
    DATE_OBJECT[fromFormat[i]] = START_DATE_SEPARATED[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    DATE_OBJECT['YYYY'] =
      DATE_OBJECT['YY'] < 30
        ? '20' + DATE_OBJECT['YY']
        : '19' + DATE_OBJECT['YY'];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    DATE_OBJECT['YY'] = DATE_OBJECT['YYYY'].slice(-2);
  }

  for (let i = 0; i < 3; i++) {
    RESULT_ARRAY.push(DATE_OBJECT[toFormat[i]]);
  }

  return RESULT_ARRAY.join(NEW_SEPARATOR);
}
module.exports = formatDate;
