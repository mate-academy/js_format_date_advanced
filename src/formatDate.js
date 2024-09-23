'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatDictionary = {};
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const inputDateParts = date.split(oldSeparator);
  const newDateParts = [];

  /* Create a dictionary with:
   * - key - first letter of the part format ('D', 'M' or 'Y')
   * - value - dictionary with the given 'format' and 'value' of this date part
   */
  for (let i = 0; i < 3; i++) {
    const format = fromFormat[i];
    const formatCategory = format[0];
    const value = inputDateParts[i];

    formatDictionary[formatCategory] = {
      format: format,
      value: value,
    };
  }

  /* For each format part of the 'toFormat', use the first letter as the key
   * to find the value that should be inserted into the same position and its
   * initial format.
   * If the value is the year number, check and if needed update the format.
   */
  for (let i = 0; i < 3; i++) {
    const format = toFormat[i];
    const formatCategory = format[0];
    const oldFormat = formatDictionary[formatCategory]['format'];
    let value = formatDictionary[formatCategory]['value'];

    if (formatCategory === 'Y') {
      value = convertYear(value, oldFormat, format);
    }

    newDateParts.push(value);
  }

  return newDateParts.join(newSeparator);
}

/**
 * @param {string} input
 * @param {string} fromFormat
 * @param {string} toFormat
 *
 * @returns {string}
 *
 * If 'fromFormat' and 'toFormat' are the same, return unchanged input.
 * When converting from `YYYY` to `YY` just use `2` last digit (`1997` -> `97`).
 * When converting from `YY` to `YYYY` use `20YY` if `YY < 30` and `19YY`
 * otherwise.
 */
function convertYear(input, fromFormat, toFormat) {
  if (fromFormat === toFormat) {
    return input;
  }

  if (fromFormat === 'YYYY' && toFormat === 'YY') {
    return input.substring(2);
  }

  if (fromFormat === 'YY' && toFormat === 'YYYY') {
    if (+input < 30) {
      return '20' + input;
    }

    return '19' + input;
  }
}

module.exports = formatDate;
