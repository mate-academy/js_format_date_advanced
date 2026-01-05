'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const TWENTY_CENTURY_PREFFIX = 19;
const TWENTY_FIRST_CENTURY_PREFFIX = 20;
const NUMBER_TO_CHECK_CENTURY = 30;
const SYMBOL_INDEX = 3;
const YEAR_FORMAT_4_SYMBOL = 'YYYY';
const YEAR_FORMAT_2_SYMBOL = 'YY';

function formatDate(date, fromFormat, toFormat) {
  const splitSymbol = fromFormat[SYMBOL_INDEX];
  const resultArray = [];
  const dateArray = date.split(splitSymbol);

  for (let i = 0; i < dateArray.length; i++) {
    const dateValue = dateArray[i];
    const currentFormat = fromFormat[i];

    const isYearFormat = isYear(currentFormat);

    const requiredIndex = isYearFormat
      ? getYearIndex(toFormat)
      : toFormat.indexOf(currentFormat);

    const requiredFormat = toFormat[requiredIndex];

    resultArray[requiredIndex] = isYearFormat
      ? formatYear(dateValue, requiredFormat.length)
      : dateValue;
  }

  const joinSymbol = toFormat[SYMBOL_INDEX];

  return resultArray.join(joinSymbol);
}

function isYear(currentFormat) {
  return (
    currentFormat === YEAR_FORMAT_4_SYMBOL ||
    currentFormat === YEAR_FORMAT_2_SYMBOL
  );
}

function getYearIndex(toFormat) {
  return toFormat.indexOf(YEAR_FORMAT_4_SYMBOL) !== -1
    ? toFormat.indexOf(YEAR_FORMAT_4_SYMBOL)
    : toFormat.indexOf(YEAR_FORMAT_2_SYMBOL);
}

function formatYear(year, requiredLength) {
  if (requiredLength === year.length) {
    return year;
  }

  if (year.length === 2) {
    const yearPreffix =
      year < NUMBER_TO_CHECK_CENTURY
        ? TWENTY_FIRST_CENTURY_PREFFIX
        : TWENTY_CENTURY_PREFFIX;

    return `${yearPreffix}${year}`;
  }

  return year.slice(2);
}

module.exports = formatDate;
