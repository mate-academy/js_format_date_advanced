'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateArray = date.split(oldSeparator);
  const dateObject = {};

  const newFormat = toFormat.slice(0, -1);
  const oldFormat = fromFormat.slice(0, -1);

  for (let i = 0; i < dateArray.length; i++) {
    const value = dateArray[i];
    const key = oldFormat[i];

    dateObject[key] = value;

    if (key === 'YY') {
      const yearNum = Number(value);

      dateObject['YYYY'] = yearNum < 30 ? '20' + value : '19' + value;
    }

    if (key === 'YYYY') {
      dateObject['YY'] = value.slice(-2);
    }
  }

  const newDate = newFormat.map((value) => dateObject[value]);

  return newDate.join(newSeparator);
}

module.exports = formatDate;
