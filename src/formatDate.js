'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const values = date.split(separator);
  const keys = fromFormat.slice(0, 3);
  const parts = {};

  for (let i = 0; i < keys.length; i++) {
    parts[keys[i]] = values[i];
  }

  if (parts.YYYY && toFormat.includes('YY')) {
    parts.YY = parts.YYYY.slice(2);
  } else if (parts.YY && toFormat.includes('YYYY')) {
   const yy = Number(parts.YY);
   if ( yy < 30) {
    parts.YYYY = `20${parts.YY}`;
   } else {
   parts.YYYY = `19${parts.YY}`;
     }
  }

  const newOrder = toFormat.slice(0, 3);
  const newSeparator = toFormat[3];
  const newDate = newOrder.map(key => parts[key]).join(newSeparator);

  return newDate;
}

module.exports = formatDate;
