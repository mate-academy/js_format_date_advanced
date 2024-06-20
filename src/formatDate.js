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
  const newFormatSorted = [...toFormat].sort(); // for easy found YYYY or YY ??
  let YearFormFromFormat = ''; // found what we in old format YY OR YYYY ??
  const arrayFromDataString = date.split(oldSeparator);
  const objectOfDataAndFormats = {};
  // object =  keys = index of fromFormat, values = digits of date;
  const fromFormatLenghtWitoutSeparator = fromFormat.length - 1;
  // delete Separator in the end of array
  const arrayOfResult = [];

  // many variables for easy reading, not )

  if (fromFormat.includes('YY')) {
    YearFormFromFormat = 'YY';
  }

  if (fromFormat.includes('YYYY')) {
    YearFormFromFormat = 'YYYY';
  }

  for (let i = 0; i < fromFormatLenghtWitoutSeparator; i++) {
    if (fromFormat[i] === YearFormFromFormat) {
      fromFormat[i] = newFormatSorted[3];
    }
    objectOfDataAndFormats[fromFormat[i]] = arrayFromDataString[i];
  }

  let valueOfKey = objectOfDataAndFormats[newFormatSorted[3]];

  if (valueOfKey.length > newFormatSorted[3].length) {
    valueOfKey = valueOfKey.slice(valueOfKey.length - 2);

    objectOfDataAndFormats[newFormatSorted[3]] = valueOfKey;
  }

  if (valueOfKey.length < newFormatSorted[3].length) {
    if (valueOfKey < 30) {
      valueOfKey = `20${valueOfKey}`;
    } else {
      valueOfKey = `19${valueOfKey}`;
    }

    objectOfDataAndFormats[newFormatSorted[3]] = valueOfKey;
  }

  for (const ch of newFormat) {
    if (objectOfDataAndFormats[ch]) {
      arrayOfResult.push(objectOfDataAndFormats[ch]);
    }
  }

  return arrayOfResult.join(newSeparator);
}

module.exports = formatDate;
