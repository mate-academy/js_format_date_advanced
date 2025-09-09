'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const ALLOWED = new Set(['YYYY', 'YY', 'MM', 'DD']);

  const OLD_SEP = fromFormat.find((x) => !ALLOWED.has(x)) ?? '';
  const NEW_SEP = toFormat.find((x) => !ALLOWED.has(x)) ?? '';
  const OLD_TOKENS = fromFormat.filter((x) => ALLOWED.has(x));
  const NEW_TOKENS = toFormat.filter((x) => ALLOWED.has(x));

  const DATE_PARTS = OLD_SEP ? date.split(OLD_SEP) : [date];

  const OLD_MAP = {};

  for (let i = 0; i < OLD_TOKENS.length; i++) {
    OLD_MAP[OLD_TOKENS[i]] = DATE_PARTS[i];
  }

  let year2, year4;

  if (OLD_MAP['YYYY']) {
    year4 = OLD_MAP['YYYY'];
    year2 = OLD_MAP['YYYY'].slice(-2);
  }

  if (OLD_MAP['YY']) {
    year2 = OLD_MAP['YY'];
    year4 = (parseInt(year2) < 30 ? '20' : '19') + year2;
  }

  const RESULT = [];

  for (const token of NEW_TOKENS) {
    switch (token) {
      case 'YYYY':
        RESULT.push(year4);
        continue;
      case 'YY':
        RESULT.push(year2);
        continue;
      case 'MM':
        RESULT.push(OLD_MAP['MM']);
        continue;
      case 'DD':
        RESULT.push(OLD_MAP['DD']);
        continue;
    }
  }

  return RESULT.join(NEW_SEP);
}

module.exports = formatDate;
