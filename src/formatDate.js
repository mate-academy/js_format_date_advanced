'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(/[-/.]/);
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

  const month = valueMap['MM'] ? Number(valueMap['MM'], 10) - 1 : 0;
  const day = valueMap['DD'] ? Number(valueMap['DD'], 10) : 1;

  if (!year) {
    return null;
  }

  const parsedDate = new Date(year, month, day);

  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  const formattedDate = toFormat.map((formatPart) => {
    switch (formatPart) {
      case 'YYYY':
        return parsedDate.getFullYear();
      case 'YY':
        return parsedDate.getFullYear().toString().slice(-2);
      case 'MM':
        return (parsedDate.getMonth() + 1).toString().padStart(2, '0');
      case 'DD':
        return parsedDate.getDate().toString().padStart(2, '0');
      default:
        return formatPart;
    }
  });

  return formattedDate.join(toFormat[3]).slice(0, -2);
}

module.exports = formatDate;
