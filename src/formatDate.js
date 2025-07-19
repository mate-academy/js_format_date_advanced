'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateStr, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];

  const fromParts = fromFormat.slice(0, 3);
  const toParts = toFormat.slice(0, 3);
  const dateValues = dateStr.split(fromSep);

  const dateMap = {};

  for (let i = 0; i < fromParts.length; i++) {
    dateMap[fromParts[i]] = dateValues[i];
  }

  const result = [];

  for (let i = 0; i < toParts.length; i++) {
    const part = toParts[i];

    if (part === 'YY') {
      const year = dateMap['YYYY'] || dateMap['YY'];

      result.push(year.slice(-2));
      continue;
    }

    if (part === 'YYYY') {
      const year = dateMap['YY'] || dateMap['YYYY'];

      if (year.length === 2) {
        let fullYear;

        if (+year < 30) {
          fullYear = '20' + year;
        } else {
          fullYear = '19' + year;
        }

        result.push(fullYear);
      } else {
        result.push(year);
      }
      continue;
    }

    result.push(dateMap[part]);
  }

  return result.join(toSep);
}

module.exports = formatDate;
