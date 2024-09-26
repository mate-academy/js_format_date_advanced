'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const resultDate = [];

  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  const slicedFormat = toFormat.slice(0, 3);

  for (let i = 0; i < slicedFormat.length; i++) {
    const formatPart = toFormat[i];

    let prop = formatPart;

    if (formatPart === 'YYYY') {
      prop = 'YY';
    }

    const fromIndex = fromFormat.findIndex((value) => value.includes(prop));

    let newProp = dateParts[fromIndex];

    if (formatPart === 'YYYY' && newProp.length === 2) {
      if (newProp < 30) {
        newProp = `20${newProp}`;
      } else {
        newProp = `19${newProp}`;
      }
    }

    if (formatPart === 'YY' && newProp.length === 4) {
      newProp = newProp.slice(2);
    }

    resultDate.push(newProp);
  }

  return resultDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
