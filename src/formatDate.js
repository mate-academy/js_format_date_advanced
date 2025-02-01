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
  const dateParts = date.split(separator);

  const dateMap = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    const year = dateMap['YYYY'];

    dateMap['YY'] = year.slice(-2);
  } else if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    const year = dateMap['YY'];

    dateMap['YYYY'] = year < 30 ? `20${year}` : `19${year}`;
  }

  let newDate = '';

  toFormat.slice(0, 3).forEach((part, index) => {
    newDate += dateMap[part];

    if (index < 2) {
      newDate += toFormat[3];
    }
  });

  return newDate;
}

module.exports = formatDate;
