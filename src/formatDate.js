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
  const dateViewInObject = {};

  fromFormat.forEach((format, i) => {
    const amount = +date.split(fromSeparator)[i];

    switch (format) {
      case 'YY':
        dateViewInObject.year = amount < 30
          ? 2000 + amount
          : 1900 + amount;
        break;

      case 'YYYY':
        dateViewInObject.year = amount;
        break;

      case 'DD':
        dateViewInObject.day = amount;
        break;

      case 'MM':
        dateViewInObject.month = amount;
        break;

      default:
        throw new Error(`Unknown format: ${format}`);
    }
  });

  const newDateViewInArray = toFormat.map((format) => {
    switch (format) {
      case 'YY':
        const year = dateViewInObject.year % 100;

        return year < 10
          ? `0${year}`
          : `${year}`;

      case 'YYYY':
        return dateViewInObject.year.toString();

      case 'DD':
        const day = dateViewInObject.day < 10
          ? `0${dateViewInObject.day}`
          : `${dateViewInObject.day}`;

        return day;

      case 'MM':
        const month = dateViewInObject.month < 10
          ? `0${dateViewInObject.month}`
          : `${dateViewInObject.month}`;

        return month;
      default:
        throw new Error(`Unknown format: ${format}`);
    }
  });

  return newDateViewInArray.join(toSeparator);
}

module.exports = formatDate;
