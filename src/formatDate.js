'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const partsDate = date.split(fromFormat[fromFormat.length - 1]);
  const correctFormat = [...toFormat];
  const separator = correctFormat[correctFormat.length - 1];

  correctFormat.pop();

  for (let i = 0; i < correctFormat.length; i++) {
    let value = partsDate[fromFormat.indexOf(correctFormat[i])];

    if (correctFormat[i] === 'DD') {
      correctFormat[i] = value;
    }

    if (correctFormat[i] === 'MM') {
      correctFormat[i] = value;
    }

    if (
      (correctFormat[i] === 'YY' || correctFormat[i] === 'YYYY') &&
      fromFormat.includes(correctFormat[i])
    ) {
      correctFormat[i] = value;
    } else if (correctFormat[i] === 'YY') {
      value = partsDate[fromFormat.indexOf('YYYY')].slice(2);
      correctFormat[i] = value;
    } else if (correctFormat[i] === 'YYYY') {
      if (Number(partsDate[fromFormat.indexOf('YY')]) < 30) {
        value = `20${partsDate[fromFormat.indexOf('YY')]}`;
      } else {
        value = `19${partsDate[fromFormat.indexOf('YY')]}`;
      }

      correctFormat[i] = value;
    }
  }

  return correctFormat.join(separator);
}

module.exports = formatDate;
