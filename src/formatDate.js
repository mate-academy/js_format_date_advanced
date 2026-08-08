'use strict';

/**
 * Create a formatDate function that accepts the date string,
 * the old fromFormat array and the new toFormat array.
 * Function returns given date in new format.
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromSeparator);
  const resultParts = [];

  for (let i = 0; i < dateParts.length; i++) {
    const currentPartType = fromFormat[i];
    let currentValue = dateParts[i];

    if (currentPartType === 'YY') {
      if (toFormat.includes('YYYY')) {
        if (currentValue < 30) {
          currentValue = '20' + currentValue;
        } else {
          currentValue = '19' + currentValue;
        }
        resultParts[toFormat.indexOf('YYYY')] = currentValue;
      }

      resultParts[toFormat.indexOf('YY')] = currentValue;
    }

    if (currentPartType === 'YYYY') {
      if (toFormat.includes('YY')) {
        currentValue = currentValue.slice(2, 4);
        resultParts[toFormat.indexOf('YY')] = currentValue;
      }
      resultParts[toFormat.indexOf('YYYY')] = currentValue;
    }

    if (currentPartType === 'DD') {
      resultParts[toFormat.indexOf('DD')] = currentValue;
    }

    if (currentPartType === 'MM') {
      resultParts[toFormat.indexOf('MM')] = currentValue;
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
