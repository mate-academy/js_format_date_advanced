'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const initialSeparator = fromFormat[3];
  const targetSeparator = toFormat[3];

  const dateChunks = date.split(initialSeparator);
  const formattedChunks = [];

  for (let i = 0; i < dateChunks.length; i++) {
    let targetIndex = toFormat.indexOf(fromFormat[i]);
    let dateChunk = dateChunks[i];

    if (targetIndex === -1) {
      targetIndex = Math.max(toFormat.indexOf('YY'), toFormat.indexOf('YYYY'));
      dateChunk = formatYear(dateChunk);
    }

    formattedChunks[targetIndex] = dateChunk;
  }

  return formattedChunks.join(targetSeparator);
}

function formatYear(year) {
  if (year.length === 4) {
    return year.slice(-2);
  }

  if (+year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
}

module.exports = formatDate;
