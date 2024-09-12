'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_INDEX = 3;
  const START_ITERATION = 0;
  const END_ITERATION = 3;
  const stringItems = date.split(fromFormat[SEPARATOR_INDEX]);
  const newDate = [];

  for (let i = START_ITERATION; i < END_ITERATION; i++) {
    let toFormatItem = toFormat[i];

    if (!fromFormat.includes(toFormatItem)) {
      const SHORT_YEAR = 'YY';
      const LONG_YEAR = 'YYYY';

      if (toFormatItem === LONG_YEAR) {
        toFormatItem = SHORT_YEAR;

        const currentYear = stringItems[fromFormat.indexOf(SHORT_YEAR)];
        const LAST_DIGITS = 30;
        const CURRENT_CENTURY_YEAR = '20';
        const PREVIOUS_CENTURY_YEAR = '19';

        stringItems[fromFormat.indexOf(SHORT_YEAR)] = currentYear < LAST_DIGITS
          ? CURRENT_CENTURY_YEAR + currentYear
          : PREVIOUS_CENTURY_YEAR + currentYear;
      } else if (toFormatItem === SHORT_YEAR) {
        toFormatItem = LONG_YEAR;

        const currentYear = stringItems[fromFormat.indexOf(LONG_YEAR)];

        stringItems[fromFormat.indexOf(LONG_YEAR)] = currentYear.slice(2);
      }
    }

    const fromFormatIndex = fromFormat.indexOf(toFormatItem);
    const item = stringItems[fromFormatIndex];

    newDate.push(item);
  }

  return newDate.join(toFormat[SEPARATOR_INDEX]);
}

module.exports = formatDate;
