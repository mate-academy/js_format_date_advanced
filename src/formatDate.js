'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateString, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateParts = dateString.split(separator);

  const dateObj = {
    YYYY: fromFormat.includes('YYYY')
      ? dateParts[fromFormat.indexOf('YYYY')]
      : null,
    YY: fromFormat.includes('YY') ? dateParts[fromFormat.indexOf('YY')] : null,
    MM: dateParts[fromFormat.indexOf('MM')],
    DD: dateParts[fromFormat.indexOf('DD')],
  };

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = +dateObj['YY'];

    dateObj['YYYY'] = year < 30 ? `20${dateObj['YY']}` : `19${dateObj['YY']}`;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  const formattedDate = [
    dateObj[toFormat[0]],
    dateObj[toFormat[1]],
    dateObj[toFormat[2]],
  ];

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
