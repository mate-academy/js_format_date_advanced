'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const dateArray = date.split(fromSeparator);
  const result = [];

  toFormat.slice(0, 3).forEach((value) => {
    let currentValue = value;

    if (value === 'YYYY') {
      currentValue = 'YY';
    }

    const fromIndex = fromFormat
      .findIndex((fromValue) => fromValue.includes(currentValue));
    let newValue = dateArray[fromIndex];

    if (value === 'YYYY' && newValue.length === 2) {
      newValue = (newValue >= 30 ? '19' : '20') + newValue;
    } else if (value === 'YY' && newValue.length === 4) {
      newValue = newValue.slice(2);
    }

    result.push(newValue);
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
