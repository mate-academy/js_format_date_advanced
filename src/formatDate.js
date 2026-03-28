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

  const values = date.split(fromSeparator);

  const dataObject = {
    [fromFormat[0]]: values[0],
    [fromFormat[1]]: values[1],
    [fromFormat[2]]: values[2],
  };

  return [
    getDatePart(dataObject, toFormat[0]),
    getDatePart(dataObject, toFormat[1]),
    getDatePart(dataObject, toFormat[2]),
  ].join(toSeparator);
}

function getDatePart(dataObject, format) {
  if (format === 'DD' || format === 'MM') {
    return dataObject[format];
  }

  if (format === 'YY') {
    if (dataObject.YY) {
      return dataObject.YY;
    }

    return dataObject.YYYY.slice(2);
  }

  if (format === 'YYYY') {
    if (dataObject.YYYY) {
      return dataObject.YYYY;
    }

    return Number(dataObject.YY) < 30
      ? `20${dataObject.YY}`
      : `19${dataObject.YY}`;
  }
}

module.exports = formatDate;
