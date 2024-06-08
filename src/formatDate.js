'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const DIVIDER_IDX = 3;
const YEARS_PERIOD = 30;
const YEARS_2000S = 20;
const YEARS_1900S = 19;
const YEAR_SHORT = 'YY';
const YEAR_LONG = 'YYYY';

function formatDate(date, fromFormat, toFormat) {
  const divider = fromFormat[DIVIDER_IDX];
  const dateParts = date.split(divider);
  const dateConfig = {};

  for (let i = 0; i < 3; i++) {
    const datePart = dateParts[i];
    const formatPart = fromFormat[i];

    if (formatPart === YEAR_LONG) {
      dateConfig.YY = datePart.slice(2);
    }

    if (formatPart === YEAR_SHORT) {
      dateConfig.YYYY = createLongYear(datePart);
    }

    dateConfig[formatPart] = datePart;
  }

  return prepareNewFormat(dateConfig, toFormat);
}

function createLongYear(shortYear) {
  const years = shortYear < YEARS_PERIOD ? YEARS_2000S : YEARS_1900S;

  return years + shortYear;
}

function prepareNewFormat(config, format) {
  return [config[format[0]], config[format[1]], config[format[2]]].join(
    format[DIVIDER_IDX],
  );
}

module.exports = formatDate;
