'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const reformattedDateArray = [];
  const curerntFormats = {};

  for (let i = 0; i < fromFormat.length; i++) {
    curerntFormats[fromFormat[i]] = dateArray[i];
  }

  function yearExtension(yy) {
    for (let i = 2023; i > 1900; i--) {
      if (i % 100 === +yy) {
        return i;
      }
    }

    return 'ERROR in year extansion';
  }

  function yearTrimming(yyyy) {
    return (yyyy).slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    curerntFormats.YYYY = yearExtension(curerntFormats.YY);
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    curerntFormats.YY = yearTrimming(curerntFormats.YYYY);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    reformattedDateArray.push(curerntFormats[toFormat[i]]);
  }

  return reformattedDateArray.join(toFormat[3]);
}

module.exports = formatDate;
