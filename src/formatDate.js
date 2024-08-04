'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , initialSeparator] = fromFormat;
  const [, , , resultingSeparator] = toFormat;
  const initialArray = fromFormat.slice(0, 3);
  const resultingArray = toFormat.slice(0, 3);
  const dateArray = date.split(initialSeparator);
  const objectDate = {};

  for (let i = 0; i < dateArray.length; i++) {
    let initialVariable = initialArray[i];
    let dateValue = dateArray[i];

    if (!resultingArray.includes(initialVariable)) {
      if (initialVariable === 'YY') {
        initialVariable = 'YYYY';

        if (+dateValue < 30) {
          dateValue = `20${dateValue}`;
        } else {
          dateValue = `19${dateValue}`;
        }
      } else {
        initialVariable = 'YY';
        dateValue = dateValue.slice(2);
      }
    }

    objectDate[initialVariable] = dateValue;
  }

  for (let i = 0; i < resultingArray.length; i++) {
    resultingArray[i] = objectDate[resultingArray[i]];
  }

  return resultingArray.join(resultingSeparator);
}

module.exports = formatDate;
