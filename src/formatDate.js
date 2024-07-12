'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorIndex = 3;
  const separator = fromFormat[separatorIndex];
  const dateParts = date.split(separator);

  const dateValues = fromFormat.reduce(
    (prev, part, index) => ({ ...prev, [part]: dateParts[index] }),
    {},
  );

  const newFormat = toFormat.map((newDatePart) => {
    if (dateValues[newDatePart]) {
      return dateValues[newDatePart];
    }

    if (newDatePart === 'YY') {
      return dateValues['YYYY'].slice(-2);
    } else {
      return dateValues['YY'] < 30
        ? `20${dateValues['YY']}`
        : `19${dateValues['YY']}`;
    }
  });

  return newFormat.slice(0, -1).join(toFormat[separatorIndex]);
}

module.exports = formatDate;
