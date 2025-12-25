'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DIVIDER = fromFormat[3];
  const REPLACER = toFormat[3];
  const PARTS_OF_DATE = date.split(DIVIDER);

  const MAPPING = {
    [fromFormat[0]]: PARTS_OF_DATE[0],
    [fromFormat[1]]: PARTS_OF_DATE[1],
    [fromFormat[2]]: PARTS_OF_DATE[2],
  };

  const YEAR_VALUE = parseInt(MAPPING['YY']);
  const TO_FORMAT_PARTS = toFormat.slice(0, 3);
  const YEAR_THRESHOLD = 30;
  const TWENTIETH_CENTURY_PREFIX = '19';
  const TWENTY_FIRST_CENTURY_PREFIX = '20';

  return TO_FORMAT_PARTS.map((part) => {
    if (part === 'YY') {
      if (MAPPING['YYYY']) {
        return MAPPING['YYYY'].slice(-2);
      }
    }

    if (part === 'YYYY') {
      if (MAPPING['YYYY']) {
        return MAPPING['YYYY'];
      }

      if (MAPPING['YY']) {
        if (YEAR_VALUE >= YEAR_THRESHOLD) {
          return TWENTIETH_CENTURY_PREFIX + MAPPING['YY'];
        } else {
          return TWENTY_FIRST_CENTURY_PREFIX + MAPPING['YY'];
        }
      }
    }

    return MAPPING[part];
  }).join(REPLACER);
}

module.exports = formatDate;
