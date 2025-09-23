'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const parts = date.split(fromSeparator);
  const dateData = {};

  fromFormat.forEach((formatPart, index) => {
    dateData[formatPart] = parts[index];
  });

  const newDateParts = toFormat.map((formatPart) => {
    let partValue = dateData[formatPart];

    if (formatPart === 'YYYY' && dateData['YY']) {
      const year = parseInt(dateData['YY']);

      partValue = (year < 30 ? '20' : '19') + dateData['YY'];
    } else if (formatPart === 'YY' && dateData['YYYY']) {
      partValue = dateData['YYYY'].slice(-2);
    }

    return partValue;
  });

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
