'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  let oldYearFormat = '';
  const inputDateParts = date.split(oldSeparator);
  const newDateParts = [];

  if (fromFormat.includes('YY')) {
    oldYearFormat = 'YY';
  } else if (fromFormat.includes('YYYY')) {
    oldYearFormat = 'YYYY';
  }

  for (let i = 0; i < 3; i++) {
    const newFormat = toFormat[i];
    let value = '';

    /**
     * Define the value of the given date part.
     * It remains unchanged if the format is the same.
     * No need to check if new format is equal to 'YY' or 'YYYY' as this is
     * done while setting the value for oldYearFormat.
     *
     * In other case call the 'convertYear' function to reformat the value.
     */
    if (['DD', 'MM'].includes(newFormat) || newFormat === oldYearFormat) {
      const valueIndex = fromFormat.indexOf(newFormat);

      value = inputDateParts[valueIndex];
    } else if (['YY', 'YYYY'].includes(newFormat)) {
      const oldValueIndex = fromFormat.indexOf(oldYearFormat);
      const oldValue = inputDateParts[oldValueIndex];

      value = convertYear(oldValue, newFormat);
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
 * When converting from `YYYY` to `YY` just use `2` last digit (`1997` -> `97`).
 * When converting from `YY` to `YYYY` use `20YY` if `YY < 30` and `19YY`
 * otherwise.
 */
function convertYear(input, toFormat) {
  if (toFormat === 'YY') {
    return input.substring(2);
  }

  if (toFormat === 'YYYY') {
    if (+input < 30) {
      return '20' + input;
    }

    return '19' + input;
  }
}

module.exports = formatDate;
