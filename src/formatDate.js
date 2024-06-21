'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3]; // For example "/"
  const newSeparator = toFormat[3]; // For example "."
  const dateComponents = date.split(oldSeparator); // array like [12 02 1993]
  const objectOfDataAndFormats = {};
  const arrayOfResult = [];

  for (let i = 0; i < dateComponents.length; i++) {
    objectOfDataAndFormats[fromFormat[i]] = dateComponents[i];

    if (objectOfDataAndFormats['YY']) {
      let NewFormatForYear = objectOfDataAndFormats['YY'];

      if (NewFormatForYear < 30) {
        NewFormatForYear = `20${NewFormatForYear}`;
      } else {
        NewFormatForYear = `19${NewFormatForYear}`;
      }
      objectOfDataAndFormats['YYYY'] = NewFormatForYear;
    }
  }

  if (fromFormat.includes('YYYY')) {
    objectOfDataAndFormats['YY'] = objectOfDataAndFormats['YYYY'].slice(
      objectOfDataAndFormats['YYYY'].length - 2,
    );
  }

  for (const ch of toFormat) {
    if (objectOfDataAndFormats[ch]) {
      arrayOfResult.push(objectOfDataAndFormats[ch]);
    }
  }

  return arrayOfResult.join(newSeparator);
}

module.exports = formatDate;
