'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // const [year, month, day] = date.split('-');
  // const newArrFrom = [];
  
  for (const i = 0; i < fromFormat.length; i++){
    fromFormat.shift();
    toFormat[i].push(fromFormat[i]);
  }

  return date.toFormat;
}

module.exports = formatDate;
