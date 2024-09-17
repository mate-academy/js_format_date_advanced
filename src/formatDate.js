'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const resultDateArray = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];
    const value = dateArray[fromFormat.indexOf(part)];

    if (part === 'YYYY' && value === undefined) {
      const valueYY = dateArray[fromFormat.indexOf('YY')];

      resultDateArray.push(valueYY < 30 ? '20' + valueYY : '19' + valueYY);
    } else if (part === 'YY' && value === undefined) {
      const valueYYYY = dateArray[fromFormat.indexOf('YYYY')];

      resultDateArray.push(valueYYYY.slice(-2));
    } else {
      resultDateArray.push(value);
    }
  }

  const resultDateSeparator = toFormat[3];
  const result = resultDateArray.join(resultDateSeparator);

  return result;
}

module.exports = formatDate;
