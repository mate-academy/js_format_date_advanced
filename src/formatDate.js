'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function convertYear(dateMap, fromParts, toParts) {
  if (fromParts.includes('YYYY') && toParts.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (fromParts.includes('YY') && toParts.includes('YYYY')) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  }
}

function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const fromParts = fromFormat.slice(0, 3);
  const toParts = toFormat.slice(0, 3);

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  fromParts.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  convertYear(dateMap, fromParts, toParts);

  const newDate = toParts.map((part) => dateMap[part]).join(toSeparator);

  return newDate;
}

module.exports = formatDate;
