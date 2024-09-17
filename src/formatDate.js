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

  const dateObj = {};

  fromFormat.forEach((part, index) => {
    if (part !== separator) {
      dateObj[part] = dateParts[index];
    }
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].substr(2, 2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    dateObj['YYYY'] = parseInt(dateObj['YY']) < 30
      ? '20' + dateObj['YY'] : '19' + dateObj['YY'];
  }

  const newSeparator = toFormat[3];
  const newDate = toFormat
    .filter(part => part !== newSeparator)
    .map(part => dateObj[part] || part)
    .join(newSeparator);

  return newDate;
}

module.exports = formatDate;
