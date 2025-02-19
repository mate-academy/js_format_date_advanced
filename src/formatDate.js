'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const delimiter = fromFormat[fromFormat.length - 1];
  const parts = date.split(delimiter);
  let newDate = '';

  const YEAR_FULL = 'YYYY';
  const YEAR_SHORT = 'YY';
  const MONTH = 'MM';
  const DAY = 'DD';

  const hasFullYear = fromFormat.includes(YEAR_FULL);
  const hasShortYear = fromFormat.includes(YEAR_SHORT);
  const yearIndex = hasShortYear
    ? fromFormat.indexOf(YEAR_SHORT)
    : hasFullYear
      ? fromFormat.indexOf(YEAR_FULL)
      : -1;

  for (let i = 0; i < toFormat.length; i++) {
    switch (true) {
      case toFormat[i].includes(YEAR_SHORT):
        if (hasFullYear && toFormat[i] === YEAR_SHORT) {
          const twoDigitYear = parseInt(
            parts[yearIndex], 10
          ).toString().slice(-2);

          newDate += twoDigitYear;
        } else if (hasShortYear) {
          const twoDigitYear = parseInt(parts[yearIndex], 10);
          const fullYear = twoDigitYear < 30 ? 2000
          + twoDigitYear : 1900 + twoDigitYear;

          newDate += fullYear;
        } else {
          newDate += parts[yearIndex];
        }
        break;

      case toFormat[i] === MONTH:
        newDate += parts[fromFormat.indexOf(MONTH)];
        break;

      case toFormat[i] === DAY:
        newDate += parts[fromFormat.indexOf(DAY)];
        break;
    }

    if (i !== toFormat.length - 1
      && toFormat[i + 1] !== toFormat[toFormat.length - 1]) {
      newDate += toFormat[toFormat.length - 1];
    }
  }

  return newDate;
}

module.exports = formatDate;
