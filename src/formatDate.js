'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.pop();
  const dateParts = date.split(separator);
  const dateMap = {};

  fromFormat.forEach((format, index) => {
    dateMap[format] = dateParts[index];
  });

  if (dateMap['YYYY'] && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (dateMap['YY'] && toFormat.includes('YYYY')) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  }

  const newSeparator = toFormat.pop();
  const newDate = toFormat.map(format => dateMap[format]).join(newSeparator);

  return newDate;
}

module.exports = formatDate;
