'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DAY_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const YEAR_SHORT_FORMAT = 'YY';
  const YEAR_LONG_FORMAT = 'YYYY';

  const oldData = date.split(OLD_SEPARATOR);
  const data = {
    dd: 0,
    mm: 0,
    year: 0,
  };

  for (let i = 0; i < oldData.length; i++) {
    if (fromFormat[i] === YEAR_LONG_FORMAT
      || fromFormat[i] === YEAR_SHORT_FORMAT) {
      data.year = oldData[i];
    }

    if (fromFormat[i] === DAY_FORMAT) {
      data.dd = oldData[i];
    }

    if (fromFormat[i] === MONTH_FORMAT) {
      data.mm = oldData[i];
    }
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === DAY_FORMAT) {
      result.push(data.dd);
    } else if (toFormat[i] === MONTH_FORMAT) {
      result.push(data.mm);
    } else if (toFormat[i] === YEAR_LONG_FORMAT
    && data.year.length === 2) {
      if (data.year < 30) {
        result.push(`20${data.year}`);
      } else {
        result.push(`19${data.year}`);
      }
    } else if (toFormat[i] === YEAR_SHORT_FORMAT
    && data.year.length === 4) {
      result.push((data.year).slice(2));
    } else if (toFormat[i] === YEAR_SHORT_FORMAT
    && data.year.length === 2) {
      result.push(data.year);
    } else if (toFormat[i] === YEAR_LONG_FORMAT
    && data.year.length === 4) {
      result.push(data.year);
    }
  }

  return result.join(NEW_SEPARATOR);
}

module.exports = formatDate;
