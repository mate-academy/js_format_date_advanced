'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const dateArray = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    const valueTo = toFormat[i];

    if (valueTo === 'YY') {
      for (let j = 0; j < 3; j++) {
        const valueFrom = fromFormat[j];
        let dateValue = dateArray[j];

        if (valueFrom === 'YYYY') {
          dateValue = dateValue[2] + dateValue[3];
          result.push(dateValue);
        }
      }
    }

    for (let j = 0; j < 3; j++) {
      const valueFrom = fromFormat[j];
      let dateValue = dateArray[j];

      if (valueFrom === 'YY' && valueTo === 'YYYY') {
        if (dateValue >= 30) {
          dateValue = '19' + dateValue;
          result.push(dateValue);
        }

        if (dateValue < 30) {
          dateValue = '20' + dateValue;
          result.push(dateValue);
        }

      }

      if (valueFrom === valueTo) {
        result.push(dateValue);
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
