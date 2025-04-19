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
  const toSeparator = toFormat[3];

  const parts = date.split(fromSeparator);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];

    dateMap[key] = parts[i];
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const token = toFormat[i];

    if (token === 'YY') {
      let year = '';

      if ('YYYY' in dateMap) {
        year = dateMap['YYYY'];
      } else if ('YY' in dateMap) {
        year = dateMap['YY'];
      }

      if (year.length === 4) {
        resultParts.push(year.slice(2));
      } else {
        resultParts.push(year);
      }
    } else if (token === 'YYYY') {
      let year = '';

      if ('YYYY' in dateMap) {
        year = dateMap['YYYY'];
      } else if ('YY' in dateMap) {
        year = dateMap['YY'];
      }

      if (year.length === 2) {
        const num = parseInt(year, 10);

        if (num < 30) {
          resultParts.push(`20${year}`);
        } else {
          resultParts.push(`19${year}`);
        }
      } else {
        resultParts.push(year);
      }
    } else {
      resultParts.push(dateMap[token]);
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
