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
  const dateValues = date.split(fromSeparator);

  const originEntries = fromFormat
    .slice(0, 3)
    .map((pattern, i) => [pattern, dateValues[i]]);
  const originDateParts = Object.fromEntries(originEntries);

  // calcula fullYear e shortYear a partir dos dados de origem
  let fullYear;

  if ('YYYY' in originDateParts) {
    fullYear = originDateParts['YYYY'];
  } else if ('YY' in originDateParts) {
    const yy = originDateParts['YY'];

    fullYear = (Number(yy) < 30 ? '20' : '19') + yy;
  }

  const shortYear = fullYear ? fullYear.slice(-2) : undefined;

  const resultParts = toFormat.slice(0, 3).map((token) => {
    if (token === 'YYYY') {
      return fullYear;
    }

    if (token === 'YY') {
      return shortYear;
    }

    return originDateParts[token];
  });

  return resultParts.join(toFormat[3]);
}

module.exports = formatDate;
