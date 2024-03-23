'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DAY_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const YEAR_SHORT_FORMAT = 'YY';
  const YEAR_FULL_FORMAT = 'YYYY';

  const dateObj = {};

  const switchYearFormat = (year, toFormatYear) => {
    const XXI_CENTURY = '20';
    const XX_CENTURY = '19';
    let res = String(year);

    if (res.length < YEAR_FULL_FORMAT.length) {
      if (res < 30) {
        res = XXI_CENTURY + res;
      } else {
        res = XX_CENTURY + res;
      }
    }

    return res.slice(toFormatYear.length * -1);
  };

  date.split(fromFormat[fromFormat.length - 1]).forEach((el, i) => {
    switch (fromFormat[i]) {
      case MONTH_FORMAT:
        dateObj.month = el;
        break;
      case DAY_FORMAT:
        dateObj.day = el;
        break;
      case YEAR_SHORT_FORMAT:
      case YEAR_FULL_FORMAT:
        dateObj.year = el;
        break;
      default:
        throw new Error('invalid format of date');
    }
  });

  const newDate = Array(toFormat.length - 1)
    .fill(null)
    .map((_, i) => {
      switch (toFormat[i]) {
        case MONTH_FORMAT:
          return dateObj.month;
        case DAY_FORMAT:
          return dateObj.day;
        case YEAR_SHORT_FORMAT:
          return switchYearFormat(dateObj.year, YEAR_SHORT_FORMAT);
        case YEAR_FULL_FORMAT:
          return switchYearFormat(dateObj.year, YEAR_FULL_FORMAT);
        default:
          throw new Error('invalid format of date');
      }
    });

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
