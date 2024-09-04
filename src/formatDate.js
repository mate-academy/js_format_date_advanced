'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.find((format) => format.length === 1);
  const dateParts = date.split(separator);

  const valueMap = fromFormat.reduce((accumulator, format, index) => {
    accumulator[format] = dateParts[index];

    return accumulator;
  }, {});

  const yy = Number(valueMap['YY']);
  const year =
    valueMap['YYYY'] ||
    (yy >= 0 && yy <= 99
      ? yy < 30
        ? `20${String(yy).padStart(2, '0')}`
        : `19${String(yy).padStart(2, '0')}`
      : valueMap['YY']);
  const month = valueMap['MM'];
  const day = valueMap['DD'];

  const formattedDate = toFormat.map((formatPart) => {
    switch (formatPart) {
      case 'YYYY':
        return year;
      case 'YY':
        return year.toString().slice(-2);
      case 'MM':
        return month.padStart(2, '0');
      case 'DD':
        return day.padStart(2, '0');
      default:
        return '';
    }
  });

  const finalSeparator = toFormat.find((format) => format.length === 1);

  return formattedDate.filter((part) => part !== '').join(finalSeparator);
}

module.exports = formatDate;
