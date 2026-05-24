'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.at(-1);
  const toSeparator = toFormat.at(-1);

  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  const dateParts = date.split(fromSeparator);

  const dateObject = {};

  fromParts.forEach((part, index) => {
    dateObject[part] = dateParts[index];
  });

  if (fromParts.includes('YYYY') && toParts.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  }

  if (fromParts.includes('YY') && toParts.includes('YYYY')) {
    const yy = dateObject['YY'];
    const prefix = parseInt(yy) < 30 ? '20' : '19';

    dateObject['YYYY'] = prefix + yy;
  }

  return toParts.map((part) => dateObject[part]).join(toSeparator);
}
module.exports = formatDate;
