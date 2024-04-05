'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const NEW_DATE = [];
  const FULL_YEAR = 'YYYY';
  const SHORT_YEAR = 'YY';
  const [, , , OLD_SEPARATOR] = fromFormat;
  const [, , , NEW_SEPARATOR] = toFormat;
  const arrDate = date.split(OLD_SEPARATOR);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === SHORT_YEAR) {
      fromFormat[i] = FULL_YEAR;

      if (arrDate[i] < 30) {
        arrDate[i] = `20${arrDate[i]}`;
      } else {
        arrDate[i] = `19${arrDate[i]}`;
      }
    }

    if (toFormat[i] === SHORT_YEAR) {
      toFormat[i] = FULL_YEAR;
      arrDate[i] = arrDate[i].slice(2);
    }

    const dataIndex = toFormat.indexOf(fromFormat[i]);

    NEW_DATE[dataIndex] = arrDate[i];
  }

  return NEW_DATE.join(NEW_SEPARATOR);
}

module.exports = formatDate;
