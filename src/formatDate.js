'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const pieces = date.split(separator);

  const pattern = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const key = fromFormat[i];
    const val = pieces[i];

    if (key.includes('Y')) {
      pattern.YEAR = val;
    } else {
      pattern[key] = val;
    }
  }

  const yyString = pattern.YEAR.slice(-2);
  const yy = Number(yyString);

  const yearFormat = toFormat.find((part) => part.includes('Y'));
  let formattedYear;

  if (yearFormat === 'YY' && pattern.YEAR.length === 4) {
    formattedYear = yyString;
  }

  if (yearFormat === 'YY' && pattern.YEAR.length === 2) {
    formattedYear = pattern.YEAR;
  }

  if (yearFormat === 'YYYY' && pattern.YEAR.length === 2) {
    formattedYear = yy < 30 ? `20${yyString}` : `19${yyString}`;
  }

  if (yearFormat === 'YYYY' && pattern.YEAR.length === 4) {
    formattedYear = pattern.YEAR;
  }

  const freshParts = [];

  for (const token of toFormat.slice(0, -1)) {
    if (token.includes('Y')) {
      freshParts.push(formattedYear);
    } else {
      freshParts.push(pattern[token]);
    }
  }

  return freshParts.join(newSeparator);
}

module.exports = formatDate;
