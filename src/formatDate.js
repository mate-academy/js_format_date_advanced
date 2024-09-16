'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedArray = date.split(fromFormat[fromFormat.length - 1]);
  const rightDate = [...toFormat];
  const separator = rightDate[rightDate.length - 1];

  rightDate.pop();

  for (let i = 0; i < rightDate.length; i++) {
    let value = splitedArray[fromFormat.indexOf(rightDate[i])];

    if (rightDate[i] === 'DD') {
      rightDate[i] = value;
    }

    if (rightDate[i] === 'MM') {
      rightDate[i] = value;
    }

    if (
      (rightDate[i] === 'YYYY' || rightDate[i] === 'YY') &&
      fromFormat.includes(rightDate[i])
    ) {
      rightDate[i] = value;
    } else if (rightDate[i] === 'YY') {
      value = splitedArray[fromFormat.indexOf('YYYY')].slice(2);
      rightDate[i] = value;
    } else if (rightDate[i] === 'YYYY') {
      if (Number(splitedArray[fromFormat.indexOf('YY')]) < 30) {
        value = '20' + splitedArray[fromFormat.indexOf('YY')];
      } else {
        value = value = '19' + splitedArray[fromFormat.indexOf('YY')];
      }
      rightDate[i] = value;
    }
  }

  return rightDate.join(separator);
}

module.exports = formatDate;
