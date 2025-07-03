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
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const dateParts = date.split(separatorFrom);
  const values = {};

  for (let i = 0; i < 3; i++) {
    const type = fromFormat[i];
    const value = dateParts[i];

    if (type === 'YY') {
      values['YY'] = value;

      const yyNum = parseInt(value, 10);

      values['YYYY'] = yyNum < 30 ? `20${value}` : `19${value}`;
    } else if (type === 'YYYY') {
      values['YYYY'] = value;
      values['YY'] = value.slice(-2);
    } else {
      values[type] = value;
    }
  }

  const resultParts = toFormat.slice(0, 3).map((type) => values[type]);

  return resultParts.join(separatorTo);
}

module.exports = formatDate;
