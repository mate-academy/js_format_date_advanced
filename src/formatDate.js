'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = toFormat[toFormat.length - 1];
  const dateArray = date.split(fromFormat[3]);
  const objectDate = {};
  const result = [];
  const fullYear = 'YYYY';
  const partYear = 'YY';

  for (let i = 0; i < 3; i++) {
    objectDate[fromFormat[i]] = dateArray[i];
  }

  if (Object.hasOwn(objectDate, partYear)) {
    if (objectDate[partYear] < 30) {
      objectDate[fullYear] = `20${objectDate[partYear]}`;
    }

    if (objectDate[partYear] >= 30) {
      objectDate[fullYear] = `19${objectDate[partYear]}`;
    }
  } else if (Object.hasOwn(objectDate, fullYear)) {
    objectDate[partYear] = objectDate[fullYear].slice(2);
  }

  for (let i = 0; i < 3; i++) {
    result[i] = objectDate[toFormat[i]];
  }

  return result.join(separator);

}

module.exports = formatDate;
