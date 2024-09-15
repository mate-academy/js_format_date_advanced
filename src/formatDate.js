'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newSeparator = toFormat[3];
  const clearDate = date.split(fromFormat[3]);
  const fixedDate = [];
  let yearValue = 0;
  let monthValue = 0;
  let dateValue = 0;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      dateValue = clearDate[i];
    }

    if (fromFormat[i] === 'MM') {
      monthValue = clearDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      yearValue = clearDate[i];
    }

    if (fromFormat[i] === 'YY') {
      yearValue = clearDate[i] > 29 ? '19' + clearDate[i] : '20' + clearDate[i];
    }
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      fixedDate[i] = dateValue;
    }

    if (toFormat[i] === 'MM') {
      fixedDate[i] = monthValue;
    }

    if (toFormat[i] === 'YYYY') {
      fixedDate[i] = yearValue;
    }

    if (toFormat[i] === 'YY') {
      fixedDate[i] = yearValue.slice(-2);
    }
  }

  return fixedDate.join(newSeparator);
}

module.exports = formatDate;
