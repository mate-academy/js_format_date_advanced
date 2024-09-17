'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  fromFormat.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  }

  const formattedDate = toFormat.map((part) => dateMap[part]).join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
