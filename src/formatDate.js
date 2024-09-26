'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayFromDate = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];
  let index;

  checkYear(arrayFromDate, fromFormat, toFormat);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    index = toFormat.indexOf(fromFormat[i]);

    newDate[index] = arrayFromDate[i];
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

function checkYear(arrayFromDate, fromFormat, toFormat) {
  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const indexOfYearFrom = fromFormat.indexOf('YYYY');
    const indexOfYearTo = toFormat.indexOf('YY');

    toFormat[indexOfYearTo] = 'YYYY';

    arrayFromDate[indexOfYearFrom] = arrayFromDate[indexOfYearFrom].slice(2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const indexOfYearFrom = fromFormat.indexOf('YY');
    const indexOfYearTo = toFormat.indexOf('YYYY');

    toFormat[indexOfYearTo] = 'YY';

    arrayFromDate[indexOfYearFrom] = arrayFromDate[indexOfYearFrom] < 30
      ? arrayFromDate[indexOfYearFrom] = `20${arrayFromDate[indexOfYearFrom]}`
      : arrayFromDate[indexOfYearFrom] = `19${arrayFromDate[indexOfYearFrom]}`;
  }
}

module.exports = formatDate;
