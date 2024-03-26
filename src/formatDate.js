'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const currentFormat = {};
  const newFormat = [];
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DATE = date.split(OLD_SEPARATOR);
  const DAY = 'DD';
  const MONTH = 'MM';
  const YEAR_SHORT = 'YY';
  const YEAR_LONG = 'YYYY';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    currentFormat[fromFormat[i]] = DATE[i];
  }

  for (const value of toFormat.slice(0, -1)) {
    let current = currentFormat[value];

    if (!currentFormat[value]) {
      current = (value === YEAR_SHORT)
        ? currentFormat[YEAR_LONG]
        : currentFormat[YEAR_SHORT];
    }

    switch (value) {
      case DAY:
        newFormat.push(current);
        break;

      case MONTH:
        newFormat.push(current);
        break;

      case YEAR_SHORT:
        newFormat.push(current.slice(2));
        break;

      case YEAR_LONG:
        if (current.length === 4) {
          newFormat.push(current);
        } else if (current >= 30) {
          newFormat.push('19' + current);
        } else {
          newFormat.push('20' + current);
        }

        break;

      default: return 'invalid data';
    }
  }

  return newFormat.join(NEW_SEPARATOR);
};

module.exports = formatDate;
