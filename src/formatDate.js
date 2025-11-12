'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (!date || !fromFormat || !toFormat) {
    throw new Error('Invalid arguments');
  }

  const fromSeparator = extractSeparator(fromFormat);
  const toSeparator = extractSeparator(toFormat);

  const dateParts = date.split(fromSeparator);

  const fromDateIndices = { year: null, month: null, day: null };
  const toDateIndices = { ...fromDateIndices };

  for (let i = 0; i < fromFormat.length - 1; i++) {
    setIndex(fromFormat, i, fromDateIndices);
    setIndex(toFormat, i, toDateIndices);
  }

  const fromYearLength = fromFormat[fromDateIndices.year].length;
  const toYearLength = toFormat[toDateIndices.year].length;

  if (fromYearLength !== toYearLength) {
    dateParts[fromDateIndices.year] = formatYear(
      dateParts[fromDateIndices.year],
      fromYearLength,
      toYearLength,
    );
  }

  const newDateFormat = [];

  newDateFormat[toDateIndices.year] = dateParts[fromDateIndices.year];
  newDateFormat[toDateIndices.month] = dateParts[fromDateIndices.month];
  newDateFormat[toDateIndices.day] = dateParts[fromDateIndices.day];

  return newDateFormat.join(toSeparator);
}

function extractSeparator(format) {
  return format.at(-1);
}

function setIndex(dateFormat, index, dateIndices) {
  switch (dateFormat[index][0]) {
    case 'Y':
      dateIndices.year = index;
      break;
    case 'M':
      dateIndices.month = index;
      break;
    case 'D':
      dateIndices.day = index;
      break;
    default:
      throw new Error(`Unknown date format ${dateFormat[index]}`);
  }
}

/**
 * Converts a year string between 2-digit (YY) and 4-digit (YYYY) formats.
 *
 * @param {string} currentYear - The year string to format (e.g., "2024"
 * or "24").
 * @param {number} fromLength - The length of the current year string (e.g., 4).
 * @param {number} toLength - The target length for the year string (e.g., 2).
 * @returns {string} The formatted year string.
 */
function formatYear(currentYear, fromLength, toLength) {
  // from YYYY to YY
  if (fromLength > toLength) {
    return currentYear.slice(2);
  }

  // from YY to YYYY
  const DECADES_THRESHOLD = 30;
  const yearPrefix =
    Number.parseInt(currentYear) < DECADES_THRESHOLD ? '20' : '19';

  return yearPrefix + currentYear;
}

module.exports = formatDate;
