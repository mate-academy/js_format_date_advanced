'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // Finding old and new date format without separator.
  const oldSchema = fromFormat.slice(0, fromFormat.length - 1);
  const newSchema = toFormat.slice(0, toFormat.length - 1);

  // Finding old and new separators.
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const separatedDate = date.split(oldSeparator);

  /* Creating date map object, where keys are values of old date format,
  and their values are appropriate values of old date */
  const fromMap = {};

  for (let i = 0; i <= oldSchema.length - 1; i++) {
    fromMap[oldSchema[i]] = separatedDate[i];
  }

  /* Transfering 'year' format */
  if (fromMap['YY'] && !fromMap['YYYY']) {
    const year = parseInt(fromMap['YY'], 10);

    if (year < 30) {
      fromMap['YYYY'] = '20' + fromMap['YY'];
    } else {
      fromMap['YYYY'] = '19' + fromMap['YY'];
    }
  } else if (fromMap['YYYY'] && !fromMap['YY']) {
    fromMap['YY'] = fromMap['YYYY'].slice(-2);
  }

  const newDateParts = [];

  for (const part of newSchema) {
    newDateParts.push(fromMap[part]);
  }

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
