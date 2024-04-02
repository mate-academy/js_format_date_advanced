'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newForm = [];
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const dataParts = date.split(oldSeparator);
  let year;

  const dateForma = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateForma[fromFormat[i]] = dataParts[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      year = parseInt(dateForma['YYYY']);

      newForm[i] = (year % 100).toString();
      continue;
    }

    if (toFormat[i].includes('YYYY') && fromFormat.includes('YY')) {
      year = parseInt(dateForma['YY']);

      if (year === 0) {
        newForm[i] = 2000;
        continue;
      }

      if (year < 30) {
        newForm[i] = '20' + year;
        continue;
      }

      if (year >= 30) {
        newForm[i] = '19' + year;
        continue;
      }

      continue;
    }

    newForm[i] = dateForma[toFormat[i]];
  }

  return newForm.join(newSeparator);
}

module.exports = formatDate;
