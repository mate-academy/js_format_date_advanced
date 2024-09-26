'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_INDEX = 3;
  const YEAR_LIMIT = 30;
  const CENTURY_21 = 20;
  const CENTURY_20 = 19;
  const DAY = 'DD';
  const MONTH = 'MM';
  const YEAR_SHORT = 'YY';
  const YEAR_LONG = 'YYYY';

  const dateStorage = {
    day: null,
    month: null,
    year: null,

    oldFormat: date.split(fromFormat[SEPARATOR_INDEX]),
    newFormat: [],
  };

  const { oldFormat, newFormat } = dateStorage;
  let { day, month, year } = dateStorage;

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    switch (fromFormat[i]) {
      case DAY:
        day = oldFormat[i];
        break;

      case MONTH:
        month = oldFormat[i];
        break;

      case YEAR_SHORT:
        year = normalizeYear(oldFormat[i]);
        break;

      case YEAR_LONG:
        year = normalizeYear(oldFormat[i]);
        break;

      default:
        throw new Error('Not valid \'fromFormat\' variable');
    }
  }

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    switch (toFormat[i]) {
      case DAY:
        newFormat[i] = day;
        break;

      case MONTH:
        newFormat[i] = month;
        break;

      case YEAR_SHORT:
        newFormat[i] = year;
        break;

      case YEAR_LONG:
        newFormat[i] = year;
        break;

      default:
        throw new Error('Not valid \'toFormat\' variable');
    }
  }

  return newFormat.join(toFormat[SEPARATOR_INDEX]);

  function normalizeYear(value) {
    const oldLengthYear = getLengthYear(fromFormat.slice(0, -1));
    const newLengthYear = getLengthYear(toFormat.slice(0, -1));

    if (oldLengthYear < newLengthYear) {
      if (+value < YEAR_LIMIT) {
        return `${CENTURY_21}${value}`;
      }

      return `${CENTURY_20}${value}`;
    }

    if (oldLengthYear > newLengthYear) {
      return value.slice(-2);
    }

    return value;
  }

  function getLengthYear(dateFormat) {
    for (const element of dateFormat) {
      if (element.includes(YEAR_SHORT)) {
        return element.length;
      }
    }
  }
}

module.exports = formatDate;
