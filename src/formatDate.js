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
  const toSeparator = toFormat[3];
  const dateParts = {};
  const dateValues = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateParts[fromFormat[i]] = dateValues[i];
  }

  if (dateParts['YY'] && toFormat.includes('YYYY')) {
    const year = parseInt(dateParts['YY'], 10);

    if (year < 30) {
      dateParts['YYYY'] = `20${dateParts['YY']}`;
    } else {
      dateParts['YYYY'] = `19${dateParts['YY']}`;
    }
  }

  if (dateParts['YYYY'] && !dateParts['YY'] && toFormat.includes('YY')) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  }

  const formattedDate = toFormat
    .filter((part) => part !== toSeparator)
    .map((part) => dateParts[part])
    .join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
