'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateSplit = date.split(oldSeparator);
  const newDateFormat = [];

  for (let i = 0; i < dateSplit.length; i++) {
    if (fromFormat[i].includes('Y') && toFormat.indexOf(fromFormat[i]) < 0) {
      if (fromFormat[i] === 'YYYY') {
        dateSplit[i] = dateSplit[i].slice(2);
        newDateFormat[toFormat.indexOf('YY')] = dateSplit[i];
      } else if (fromFormat[i] === 'YY') {
        const years = dateSplit[i] < 30 ? 20 : 19;

        newDateFormat[i] = years + dateSplit[i];
      }
    }

    newDateFormat[toFormat.indexOf(fromFormat[i])] = dateSplit[i];
  }

  return newDateFormat.join(newSeparator);
}

module.exports = formatDate;
