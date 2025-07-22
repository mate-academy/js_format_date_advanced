'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // Extract separator from fromFormat (last element)
  const fromSep = fromFormat[fromFormat.length - 1];
  // Extract separator from toFormat (last element)
  const toSep = toFormat[toFormat.length - 1];

  // Extract parts order from fromFormat (all but last element)
  const fromParts = fromFormat.slice(0, -1);
  // Extract parts order from toFormat (all but last element)
  const toParts = toFormat.slice(0, -1);

  // Split the input date string by fromSep
  const dateParts = date.split(fromSep);

  // Build an object mapping part name to value
  const dateMap = {};
  for (let i = 0; i < fromParts.length; i++) {
    dateMap[fromParts[i]] = dateParts[i];
  }

  // Handle year conversion if needed
  if ('YYYY' in dateMap && toParts.includes('YY')) {
    // YYYY to YY - last two digits
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }
  if ('YY' in dateMap && toParts.includes('YYYY')) {
    // YY to YYYY - convert according to rule
    const yy = parseInt(dateMap['YY'], 10);
    dateMap['YYYY'] = (yy < 30 ? '20' : '19') + (yy < 10 ? '0' + yy : yy.toString());
  }

  // Compose the output by toParts order, taking care of year format
  const outputParts = toParts.map(part => dateMap[part]);

  // Join by new separator
  return outputParts.join(toSep);
}

module.exports = formatDate;
