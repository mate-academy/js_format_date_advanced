'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DAYS = 'DD';
  const MONTHS = 'MM';
  const YEARS_SHORT = 'YY';
  const YEARS_LONG = 'YYYY';
  const FROM_DELIMITER = fromFormat[fromFormat.length - 1];
  const TO_DELIMITER = toFormat[toFormat.length - 1];

  const dateArray = date.split(FROM_DELIMITER);
  const dateDetails = [];
  const fromFormatYears =
    fromFormat.indexOf(YEARS_LONG) >= 0 ? YEARS_LONG : YEARS_SHORT;
  const toFormatYears =
    toFormat.indexOf(YEARS_LONG) >= 0 ? YEARS_LONG : YEARS_SHORT;
  const toFormatYearsIndex = Math.max(
    toFormat.indexOf(YEARS_SHORT),
    toFormat.indexOf(YEARS_LONG),
  );

  dateDetails[toFormat.indexOf(DAYS)] = dateArray[fromFormat.indexOf(DAYS)];
  dateDetails[toFormat.indexOf(MONTHS)] = dateArray[fromFormat.indexOf(MONTHS)];

  dateDetails[toFormatYearsIndex] = getYears(
    toFormatYears,
    dateArray[fromFormat.indexOf(fromFormatYears)],
  );

  return dateDetails.join(TO_DELIMITER);
}

function getYears(toFormatYears, value) {
  const formatLength = toFormatYears.length;
  const valueLength = value.length;

  if (formatLength === value.length) {
    return value;
  }

  if (formatLength < valueLength) {
    return value.slice(2);
  }

  return +value < 30 ? '20' + value : '19' + value;
}

module.exports = formatDate;
