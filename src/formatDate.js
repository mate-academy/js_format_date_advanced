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
  const result = [];

  for (const initialElement of initialArray) {
    for (const resultingElement of resultingArray) {
      const initialIndex = initialArray.indexOf(initialElement);
      const resultingIndex = resultingArray.indexOf(resultingElement);

      if (initialElement === resultingElement) {
        result[resultingIndex] = dateArray[initialIndex];
        continue;
      }

      if (initialElement.includes('YY') && resultingElement.includes('YY')) {
        if (initialElement.length < resultingElement.length) {
          if (+dateArray[initialIndex] < 30) {
            result[resultingIndex] = `20${dateArray[initialIndex]}`;
          } else {
            result[resultingIndex] = `19${dateArray[initialIndex]}`;
          }
        } else {
          result[resultingIndex] = dateArray[initialIndex].slice(2);
        }
      }
    }
  }

  return result.join(resultingSeparator);
}

module.exports = formatDate;
