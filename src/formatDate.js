'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const initialDivider = fromFormat[3];
  const outputDivider = toFormat[3];
  const dateArr = date.split(initialDivider);
  const outputArr = [];
  let day = null;
  let month = null;
  let year = null;

  for (let i = 0; i < dateArr.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = '' + dateArr[i];
        break;
      case 'MM':
        month = '' + dateArr[i];
        break;
      case 'YYYY':
        year = '' + dateArr[i];
        break;
      case 'YY':
        year = yearGenerate(dateArr[i]);
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      outputArr[i] = day;
    } else if (toFormat[i] === 'MM') {
      outputArr[i] = month;
    } else if (toFormat[i] === 'YYYY') {
      outputArr[i] = year;
    } else {
      outputArr[i] = year.slice(-2);
    }
  }

  const rez = outputArr.join(outputDivider);

  return rez;
}

function yearGenerate(value) {
  if (value < 30) {
    return `20${value}`;
  }

  return `19${value}`;
}

module.exports = formatDate;
