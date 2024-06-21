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
  const newFormat = toFormat;
  const oldFormat = fromFormat;
  let YearFormFromFormat = ''; // found what we in old format YY OR YYYY ??
  const dateComponents = date.split(oldSeparator);
  const objectOfDataAndFormats = {};
  // object =  keys = index of fromFormat, values = digits of date;
  const fromFormatLengthWithoutSeparator = fromFormat.length - 1;
  // delete Separator in the end of array
  const arrayOfResult = [];
  const shortFormatOFYear = 'YY';
  const longFormatOFYear = 'YYYY';
  // many variables for easy reading, not )

  let indexOfYearFormat = 0;

  for (const ch of newFormat) {
    if (ch === shortFormatOFYear || ch === longFormatOFYear) {
      indexOfYearFormat = newFormat.indexOf(ch);
    }
  }

  if (fromFormat.includes(shortFormatOFYear)) {
    YearFormFromFormat = shortFormatOFYear;
  }

  if (fromFormat.includes(longFormatOFYear)) {
    YearFormFromFormat = longFormatOFYear;
  }

  for (let i = 0; i < fromFormatLengthWithoutSeparator; i++) {
    if (oldFormat[i] === YearFormFromFormat) {
      oldFormat[i] = newFormat[indexOfYearFormat];
    }
    objectOfDataAndFormats[oldFormat[i]] = dateComponents[i];
  }

  let valueOfKey = objectOfDataAndFormats[newFormat[indexOfYearFormat]];

  if (valueOfKey.length > newFormat[indexOfYearFormat].length) {
    valueOfKey = valueOfKey.slice(valueOfKey.length - 2);

    objectOfDataAndFormats[newFormat[indexOfYearFormat]] = valueOfKey;
  }

  if (valueOfKey.length < newFormat[indexOfYearFormat].length) {
    if (valueOfKey < 30) {
      valueOfKey = `20${valueOfKey}`;
    } else {
      valueOfKey = `19${valueOfKey}`;
    }

    objectOfDataAndFormats[newFormat[indexOfYearFormat]] = valueOfKey;
  }

  for (const ch of newFormat) {
    if (objectOfDataAndFormats[ch]) {
      arrayOfResult.push(objectOfDataAndFormats[ch]);
    }
  }

  return arrayOfResult.join(newSeparator);
}

module.exports = formatDate;
