'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
const MONTH = 'MM';
const DAY = 'DD';
const YEAR_LONG = 'YYYY';
const YEAR_SHORT = 'YY';

const PREV_CENTURY_HALF = '19';
const CURR_CENTURY_HALF = '20';
const YEAR_CHECK = 30;

function formatDate(date, fromFormat, toFormat) {
  const dateObj = makeDateObject(date, fromFormat);
  const separator = toFormat.slice(-1);
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    const toFormatPart = toFormat[i];
    let newPart;

    if (toFormatPart === DAY || toFormatPart === MONTH) {
      newPart = dateObj[toFormatPart];
    } else if (toFormatPart === YEAR_SHORT || toFormatPart === YEAR_LONG) {
      newPart = normalizeYear(dateObj[YEAR_SHORT], toFormatPart);
    }

    newDate.push(newPart);
  }

  return newDate.join(separator);
}

function makeDateObject(date, format) {
  const separator = format.slice(-1);
  const dateParts = date.split(separator);
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    let part = format[i];

    if (part === YEAR_LONG) {
      part = YEAR_SHORT;
    }

    dateObj[part] = dateParts[i];
  }

  return dateObj;
}

function normalizeYear(year, formatYear) {
  const lengthDiff = year.length - formatYear.length;

  if (lengthDiff === 0) {
    return year;
  } else if (lengthDiff < 0) {
    return (year < YEAR_CHECK ? CURR_CENTURY_HALF : PREV_CENTURY_HALF) + year;
  } else {
    return year.slice(-2);
  }
}

module.exports = formatDate;
