'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const result = [];

  const FULL_YEAR = 'YYYY';
  const SHORT_YEAR = 'YY';

  const [, , , oldSeparator] = fromFormat;
  const [, , , newSeparator] = toFormat;

  const arrDate = date.split(oldSeparator);

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

    result[dataIndex] = arrDate[i];
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
