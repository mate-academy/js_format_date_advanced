'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArrow = date.split(fromFormat[fromFormat.length - 1]);
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (dateArrow[fromFormat.indexOf(toFormat[i])] === undefined) {
      fromFormat[i] = toFormat[i];
    }

    if (
      dateArrow[fromFormat.indexOf(toFormat[i])].length < toFormat[i].length &&
      dateArrow[fromFormat.indexOf(toFormat[i])] < 30
    ) {
      dateArrow[fromFormat.indexOf(toFormat[i])] =
        '20' + dateArrow[fromFormat.indexOf(toFormat[i])];
    }

    if (
      dateArrow[fromFormat.indexOf(toFormat[i])].length < toFormat[i].length &&
      dateArrow[fromFormat.indexOf(toFormat[i])] >= 30
    ) {
      dateArrow[fromFormat.indexOf(toFormat[i])] =
        '19' + dateArrow[fromFormat.indexOf(toFormat[i])];
    }

    if (
      dateArrow[fromFormat.indexOf(toFormat[i])].length > toFormat[i].length
    ) {
      dateArrow[fromFormat.indexOf(toFormat[i])] =
        dateArrow[fromFormat.indexOf(toFormat[i])].slice(2);
    }

    result[i] = dateArrow[fromFormat.indexOf(toFormat[i])];
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
