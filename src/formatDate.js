'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const LONG_YEAR_FROMAT = 'YYYY';
  const SHORT_YEAR_FROMAT = 'YY';

  const splitDate = date.split(fromFormat[fromFormat.length - 1]);

  const dateComponents = {};
  const newFormatDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateComponents[fromFormat[i]] = splitDate[i];
  }

  for (const value of toFormat) {
    if (dateComponents[value]) {
      newFormatDate.push(dateComponents[value]);

      continue;
    }

    switch (value) {
      case LONG_YEAR_FROMAT:
        const yearPrefix = +dateComponents[SHORT_YEAR_FROMAT] < 30
          ? '20'
          : '19';

        newFormatDate.push(yearPrefix + dateComponents[SHORT_YEAR_FROMAT]);
        break;

      case SHORT_YEAR_FROMAT:
        newFormatDate.push(dateComponents[LONG_YEAR_FROMAT].slice(-2));
        break;
    }
  }

  return newFormatDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
