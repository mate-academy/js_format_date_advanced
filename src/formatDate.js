'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const SHORT_YEAR_FORMAT = 'YY';
const LONG_YEAR_FORMAT = 'YYYY';
const DIVIDER_IDX = 3;
const YEARS_RANGE_3000S = 30;

const config = {};

function formatDate(date, fromFormat, toFormat) {
  const fromDivider = fromFormat[DIVIDER_IDX];
  const toDivider = toFormat[DIVIDER_IDX];
  const dateParts = date.split(fromDivider);

  for (let i = 0; i < 3; i++) {
    const formatPart = fromFormat[i];
    const datePart = dateParts[i];

    if (formatPart === LONG_YEAR_FORMAT) {
      config.YY = datePart.slice(2);
    }

    if (formatPart === SHORT_YEAR_FORMAT) {
      config.YYYY =
        datePart < YEARS_RANGE_3000S ? `20${datePart}` : `19${datePart}`;
    }

    config[fromFormat[i]] = dateParts[i];
  }

  return Array.from({ length: 3 }, (_v, idx) => config[toFormat[idx]]).join(
    toDivider,
  );
}

module.exports = formatDate;
