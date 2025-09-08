'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const OLD_SEP = fromFormat.at(-1);
  const OLD_TOKENS = fromFormat.slice(0, 3);
  const NEW_SEP = toFormat.at(-1);
  const NEW_TOKENS = toFormat.slice(0, 3);

  const DATE_PARTS = date.split(OLD_SEP);

  const OLD_MAP = {};

  for (let i = 0; i < 3; i++) {
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

  const mm = pad2(OLD_MAP['MM']);
  const dd = pad2(OLD_MAP['DD']);

  const result = [];

  for (const token of NEW_TOKENS) {
    switch (token) {
      case 'YYYY':
        result.push(year4);
        continue;
      case 'YY':
        result.push(year2);
        continue;
      case 'MM':
        result.push(mm);
        continue;
      case 'DD':
        result.push(dd);
        continue;
    }
  }

  return result.join(NEW_SEP);
}

function pad2(data) {
  return data.toString().padStart(2, '0');
}

module.exports = formatDate;
