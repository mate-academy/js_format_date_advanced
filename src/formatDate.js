'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fromSeparator = fromFormat[3];
  const fromOrder = fromFormat.slice(0, 3);
  const dateParts = date.split(fromSeparator);
  const values = {};

  for (let i = 0; i < fromOrder.length; i++) {
    values[fromOrder[i]] = dateParts[i];
  }

  let fullYear;

  if (values.YYYY !== undefined) {
    fullYear = values.YYYY;
  } else {
    const yy = Number(values.YY);

    fullYear = yy < 30 ? `20${values.YY}` : `19${values.YY}`;
  }

  const month = values.MM;
  const day = values.DD;
  const toSeparator = toFormat[3];
  const toOrder = toFormat.slice(0, 3);
  const resultParts = [];

  for (let i = 0; i < toOrder.length; i++) {
    const label = toOrder[i];

    if (label === 'YYYY') {
      resultParts[resultParts.length] = fullYear;
    } else if (label === 'YY') {
      resultParts[resultParts.length] = fullYear.slice(-2);
    } else if (label === 'MM') {
      resultParts[resultParts.length] = month;
    } else if (label === 'DD') {
      resultParts[resultParts.length] = day;
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
