'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const oldDate = date.split(oldSeparator);
  const dateData = {};

  for (const part of oldDate) {
    const key = fromFormat.shift();

    dateData[key] = part;

    if (key === 'YY') {
      dateData.YYYY = part < 30 ? `20${part}` : `19${part}`;
    }

    if (key === 'YYYY') {
      dateData.YY = dateData[key].slice(-2);
    }
  }

  return toFormat.map(key => dateData[key]).join(newSeparator);
}

module.exports = formatDate;
