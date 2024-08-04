'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const fromParts = fromFormat.slice(0, 3);
  const toParts = toFormat.slice(0, 3);

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  for (let i = 0; i < fromParts.length; i++) {
    dateMap[fromParts[i]] = dateParts[i];
  }

  if (fromParts.includes('YYYY') && toParts.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (fromParts.includes('YY') && toParts.includes('YYYY')) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  }

  let newDate = '';

  for (let i = 0; i < toParts.length; i++) {
    if (i > 0) {
      newDate += toSeparator;
    }
    newDate += dateMap[toParts[i]];
  }

  return newDate;
}

module.exports = formatDate;
