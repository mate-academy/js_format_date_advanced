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

  const parts = date.split(fromSeparator);
  const dateParts = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateParts[part] = parts[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yy = parseInt(dateParts['YY'], 10);

    if (yy < 30) {
      dateParts['YYYY'] = `20${dateParts['YY']}`;
    } else {
      dateParts['YYYY'] = `19${dateParts['YY']}`;
    }
  }

  const formattedDate = [
    dateParts[toFormat[0]],
    dateParts[toFormat[1]],
    dateParts[toFormat[2]],
  ].join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
