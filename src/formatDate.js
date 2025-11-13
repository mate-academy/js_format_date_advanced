'use strict';

const FORMAT_YEAR_LONG = 'YYYY';
const FORMAT_YEAR_SHORT = 'YY';
const FORMAT_MONTH = 'MM';
const FORMAT_DAY = 'DD';
const CENTURIES_THRESHOLD = 30;

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year = '';
  let month = '';
  let day = '';

  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromSeparator);

  fromFormat.slice(0, 3).forEach((part, index) => {
    switch (part) {
      case FORMAT_YEAR_LONG:
      case FORMAT_YEAR_SHORT:
        year = dateParts[index];
        break;

      case FORMAT_MONTH: {
        month = dateParts[index];
        break;
      }

      case FORMAT_DAY: {
        day = dateParts[index];
        break;
      }

      default: {
        throw new Error(`Unknown date part: ${part}`);
      }
    }
  });

  const formattedDateParts = toFormat.slice(0, 3).map((part) => {
    switch (part) {
      case FORMAT_YEAR_LONG: {
        return year.length === 2
          ? `${+year < CENTURIES_THRESHOLD ? '20' : '19'}${year}`
          : year;
      }

      case FORMAT_YEAR_SHORT: {
        return year.length === 4 ? year.slice(2) : year;
      }

      case FORMAT_MONTH: {
        return month;
      }

      case FORMAT_DAY: {
        return day;
      }

      default: {
        throw new Error(`Unknown date part: ${part}`);
      }
    }
  });

  return formattedDateParts.join(toSeparator);
}

module.exports = formatDate;
