'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateStr, fromFormat, toFormat) {
  const targetSeparator = toFormat[toFormat.length - 1];
  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  const sourceSeparator = fromFormat[fromFormat.length - 1];
  const dateParts = dateStr.split(sourceSeparator);

  const data = {};

  for (let i = 0; i < fromParts.length; i++) {
    data[fromParts[i]] = dateParts[i];
  }

  if (data['YYYY'] && !data['YY']) {
    data['YY'] = data['YYYY'].slice(-2);
  } else if (data['YY'] && !data['YYYY']) {
    const yyNum = parseInt(data['YY'], 10);

    data['YYYY'] = yyNum < 30 ? `20${data['YY']}` : `19${data['YY']}`;
  }

  const resultParts = toParts.map((part) => data[part]);

  return resultParts.join(targetSeparator);
}

module.exports = formatDate;
