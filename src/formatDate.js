'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = toFormat[3];
  const arrayDate = date.split(fromFormat[3]);
  const objectDate = {};
  const finalDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const formatElement = fromFormat[i];
    const arrayElement = arrayDate[i];

    if (formatElement === 'YY') {
      if (arrayElement < 30) {
        objectDate['YYYY'] = `20${arrayElement}`;
      }

      if (arrayElement >= 30) {
        objectDate['YYYY'] = `19${arrayElement}`;
      }
    }

    objectDate[formatElement] = arrayElement;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const element = toFormat[i];

    if (element === 'YY') {
      finalDate.push(objectDate['YYYY'].slice(2));
    } else {
      finalDate.push(objectDate[element]);
    }
  }

  return finalDate.join(separator);
}

module.exports = formatDate;
