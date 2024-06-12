'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const values = date.split(fromSeparator);
  const monthIndex = fromFormat.indexOf('MM');
  const monthValue = values[monthIndex];
  const dayIndex = fromFormat.indexOf('DD');
  const dayValue = values[dayIndex];
  const isYearFormat = fromFormat.includes('YYYY');
  const yearIndex = yearsFormatter(isYearFormat, fromFormat);
  const yearValue = values[yearIndex];
  const convertedMonthIndex = toFormat.indexOf('MM');
  const convertedDayIndex = toFormat.indexOf('DD');
  const isConvertedYearFormat = toFormat.includes('YYYY');
  const convertedYearIndex = yearsFormatter(isConvertedYearFormat, toFormat);
  const convertedYearValue = yearsConverter(
    isYearFormat, isConvertedYearFormat, yearValue
  );
  const reorderedValues = reorder(
    monthValue, dayValue, convertedYearValue,
    convertedMonthIndex, convertedDayIndex, convertedYearIndex
  );
  const toSeparator = toFormat[3];

  return reorderedValues.join(toSeparator);
}

function yearsFormatter(isYear, array) {
  if (isYear) {
    return array.indexOf('YYYY');
  } else {
    return array.indexOf('YY');
  }
}

function yearsConverter(isYear, isConvertedYear, yearValue) {
  if (isYear === true && isConvertedYear === true) {
    return yearValue;
  }

  if (isYear === false && isConvertedYear === false) {
    return yearValue;
  }

  if (isYear === false && isConvertedYear === true) {
    if (+yearValue < 30) {
      return +yearValue + 2000;
    } else {
      return +yearValue + 1900;
    }
  }

  if (isYear === true && isConvertedYear === false) {
    return yearValue[2] + yearValue[3];
  }
}

function reorder(
  monthValue, dayValue, yearValue,
  monthIndex, dayIndex, yearIndex
) {
  const results = [];

  results[monthIndex] = monthValue;
  results[dayIndex] = dayValue;
  results[yearIndex] = yearValue;

  return results;
}

module.exports = formatDate;
