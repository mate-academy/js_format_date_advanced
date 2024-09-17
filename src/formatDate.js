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
  const dictionary = {};

  const parts = date.split(fromSeparator);

  for (let i = 0; i < parts.length; i++) {
    const key = fromFormat[i];

    dictionary[key] = parts[i];
  }

  if (dictionary['YY']) {
    const year = dictionary['YY'];

    dictionary['YYYY'] = (+year < 30) ? `20${year}` : `19${year}`;
  } else {
    dictionary['YY'] = dictionary['YYYY'].slice(-2);
  }

  const newParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    newParts.push(dictionary[toFormat[i]]);
  }

  return newParts.join(toFormat[3]);
}

module.exports = formatDate;
