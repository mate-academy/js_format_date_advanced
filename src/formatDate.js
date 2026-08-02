'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (!date) {
    return undefined;
  }

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(oldSeparator);

  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const key = fromFormat[i];
    const value = dateParts[i];

    dateMap[key] = value;
  }

  if (toFormat.includes('YY') && dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (toFormat.includes('YYYY') && dateMap['YY']) {
    const year = dateMap['YY'];

    if (Number(year) < 30) {
      dateMap['YYYY'] = `20${year}`;
    } else {
      dateMap['YYYY'] = `19${year}`;
    }
  }

  const newSeparator = toFormat[toFormat.length - 1];
  const resultParts = [];

  for (let j = 0; j < toFormat.length - 1; j++) {
    const key = toFormat[j];

    resultParts.push(dateMap[key]);
  }

  return resultParts.join(newSeparator);
}

module.exports = formatDate;
