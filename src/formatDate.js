'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const fromFormatCopy = [...fromFormat].slice(0, -1);
  const toFormatCopy = [...toFormat].slice(0, -1);
  const dateParts = date.split(fromSeparator);
  const dateViewInObject = {};

  fromFormatCopy.forEach((format, i) => {
    const amount = dateParts[i];

    switch (format) {
      case 'YY':
        dateViewInObject.YYYY = +amount < 30
          ? '20' + amount
          : '19' + amount;
        break;

      case 'YYYY':
        dateViewInObject.YY = amount.toString().slice(-2);
        dateViewInObject.YYYY = amount;
        break;

      case 'DD':
        dateViewInObject.DD = amount;
        break;

      case 'MM':
        dateViewInObject.MM = amount;
        break;

      default:
        throw new Error(`Unknown format: ${format}`);
    }
  });

  return toFormatCopy
    .reduce((formatedDate, format) => {
      formatedDate.push(dateViewInObject[format]);

      return formatedDate;
    }, [])
    .join(toSeparator);
}

module.exports = formatDate;
