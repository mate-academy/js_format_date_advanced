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
  const fromTokens = fromFormat.slice(0, -1);
  const toTokens = toFormat.slice(0, -1);
  const dateParts = date.split(fromSeparator);
  const dateMap = {};

  for (let i = 0; i < fromTokens.length; i++) {
    dateMap[fromTokens[i]] = dateParts[i];
  }

  let year = dateMap['YYYY'] || dateMap['YY'];

  if (dateMap['YY'] && !dateMap['YYYY']) {
    const yyInt = parseInt(dateMap['YY'], 10);
    const century = yyInt < 30 ? '20' : '19';

    year = century + dateMap['YY'];
  }

  if (year) {
    dateMap['YYYY'] = year;
    dateMap['YY'] = year.slice(-2);
  }

  const result = [];

  for (let i = 0; i < toTokens.length; i++) {
    result.push(dateMap[toTokens[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
