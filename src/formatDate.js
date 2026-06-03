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

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  const convertYear = (value, target) => {
    if (target === 'YY' && value.length === 4) {
      return value.slice(-2);
    }

    if (target === 'YYYY' && value.length === 2) {
      let yy = parseInt(value);

      if (yy === 0) {
        yy = '00';
      }

      return yy < 30 ? `20${yy}` : `19${yy}`;
    }

    return value;
  };

  const formattedDate = [];

  for (const format of toFormat) {
    if (format === toSeparator) {
      continue;
    }

    if (format === 'YY' || format === 'YYYY') {
      const year = dateMap['YYYY'] || dateMap['YY'];

      formattedDate.push(convertYear(year, format));
    } else {
      formattedDate.push(dateMap[format]);
    }
  }

  return formattedDate.join(toSeparator);
}

module.exports = formatDate;
