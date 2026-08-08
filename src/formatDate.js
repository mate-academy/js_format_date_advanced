'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);

  const values = {
    [fromFormat[0]]: dateParts[0],
    [fromFormat[1]]: dateParts[1],
    [fromFormat[2]]: dateParts[2],
  };

  if (values.YYYY && !values.YY) {
    values.YY = values.YYYY.slice(-2);
  }

  if (values.YY && !values.YYYY) {
    const yy = Number(values.YY);

    values.YYYY = yy < 30 ? `20${values.YY}` : `19${values.YY}`;
  }

  const outputParts = [
    values[toFormat[0]],
    values[toFormat[1]],
    values[toFormat[2]],
  ];

  return outputParts.join(toFormat[3]);
}

module.exports = formatDate;
