'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , separator] = fromFormat;
  const [, , , newSeparator] = toFormat;

  const separatedDate = date.split(separator);

  const YEAR_INDEX =
    fromFormat.indexOf('YYYY') !== -1
      ? fromFormat.indexOf('YYYY')
      : fromFormat.indexOf('YY');

  const NEW_YEAR_INDEX =
    toFormat.indexOf('YYYY') !== -1
      ? toFormat.indexOf('YYYY')
      : toFormat.indexOf('YY');
  const MONTH_INDEX = fromFormat.indexOf('MM');
  const NEW_MONTH_INDEX = toFormat.indexOf('MM');
  const DAY_INDEX = fromFormat.indexOf('DD');
  const NEW_DAY_INDEX = toFormat.indexOf('DD');

  const result = [];

  const currentYear = separatedDate[YEAR_INDEX];
  const fromYearFormat = fromFormat[YEAR_INDEX];
  const toYearFormat = toFormat[NEW_YEAR_INDEX];

  if (fromYearFormat === 'YYYY' && toYearFormat === 'YY') {
    result[NEW_YEAR_INDEX] = currentYear.slice(-2);
  } else if (fromYearFormat === 'YY' && toYearFormat === 'YYYY') {
    const yearNumber = parseInt(currentYear, 10);

    if (yearNumber <= 25) {
      result[NEW_YEAR_INDEX] = `20${currentYear}`;
    } else {
      result[NEW_YEAR_INDEX] = `19${currentYear}`;
    }
  } else {
    result[NEW_YEAR_INDEX] = currentYear;
  }

  result[NEW_MONTH_INDEX] = separatedDate[MONTH_INDEX];
  result[NEW_DAY_INDEX] = separatedDate[DAY_INDEX];

  return result.join(newSeparator);
}

module.exports = formatDate;
