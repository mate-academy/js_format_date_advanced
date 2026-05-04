'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];

  const toSep = toFormat[3];

  const dateParts = date.split(fromSep);

  const values = {};

  for (let i = 0; i < 3; i++) {
    values[fromFormat[i]] = dateParts[i];
  }

  if (values.YYYY && !values.YY) {
    values.YY = values.YYYY.slice(-2);
  } else if (values.YY && !values.YYYY) {
    const yyNum = parseInt(values.YY);

    const prefix = yyNum < 30 ? '20' : '19';

    values.YYYY = prefix + values.YY;
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const label = toFormat[i];

    resultParts.push(values[label]);
  }

  return resultParts.join(toSep);
}

module.exports = formatDate;
