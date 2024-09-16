'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const dateSave = {};
  const newDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    // console.log(dateParts[i]);
    dateSave[fromFormat[i]] = dateParts[i];
    // console.log(dateSave);
  }

  if (!fromFormat.includes('YY')) {
    dateSave.YY = dateSave.YYYY.slice(2);
    // console.log(dateSave);
  } else {
    if (dateSave.YY < '30') {
      dateSave.YYYY = '20' + dateSave.YY;
    } else {
      dateSave.YYYY = '19' + dateSave.YY;
    }
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    // console.log(newDateFormat);

    newDate.push(dateSave[toFormat[i]]);
    // console.log(dateSave[toFormat[i]]);
  }
  // console.log(newDate.join(toFormat[3]));

  return newDate.join(toFormat[3]);
}
module.exports = formatDate;
