'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplit = date.split(fromFormat[fromFormat.length - 1]);
  const dateFinal = [];
  const dateObject = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateObject[fromFormat[i]] = dateSplit[i];
  }

  if (dateObject['YYYY']) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  }

  if (dateObject['YY'] < 30) {
    dateObject['YYYY'] = `20${dateObject['YY']}`;
  } else {
    dateObject['YYYY'] = `19${dateObject['YY']}`;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    dateFinal.push(dateObject[toFormat[i]]);
  }

  return dateFinal.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
