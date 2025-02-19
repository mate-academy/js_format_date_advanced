'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FULL_YEAR = 'YYYY';
  const SHORT_YEAR = 'YY';
  const MONTH = 'MM';
  const DAY = 'DD';

  let year;
  let month;
  let day;

  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const toParts = [];
  const fromParts = date.split(fromSeparator);

  for (let i = 0; i < fromParts.length; i++) {
    if (fromFormat[i] === FULL_YEAR) {
      year = fromParts[i];
    }

    if (fromFormat[i] === SHORT_YEAR) {
      if (fromParts[i] < 30) {
        year = `${20}` + fromParts[i];
      }

      if (fromParts[i] >= 30) {
        year = `${19}` + fromParts[i];
      }
    }

    if (fromFormat[i] === MONTH) {
      month = fromParts[i];
    }

    if (fromFormat[i] === DAY) {
      day = fromParts[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === FULL_YEAR) {
      toParts.push(year);
    }

    if (toFormat[j] === SHORT_YEAR) {
      toParts.push(year[2] + year[3]);
    }

    if (toFormat[j] === MONTH) {
      toParts.push(month);
    }

    if (toFormat[j] === DAY) {
      toParts.push(day);
    }
  }

  return toParts.join(toSeparator);
}

module.exports = formatDate;
