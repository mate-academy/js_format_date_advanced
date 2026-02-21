'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const prevParsedDate = parseDate(
    date,
    fromFormat.slice(0, -1),
    fromFormat[3],
  );

  const newFormat = reformatDate(toFormat.slice(0, -1), prevParsedDate);

  return newFormat.join(toFormat[3]);
}

function reformatDate(dateFormat, prevParsedDate) {
  const dateValues = [];

  for (const token of dateFormat) {
    if (token === 'YYYY' && !prevParsedDate[token]) {
      const year =
        +prevParsedDate['YY'] < 30
          ? `20${prevParsedDate['YY']}`
          : `19${prevParsedDate['YY']}`;

      dateValues.push(year);
      continue;
    }

    if (token === 'YY' && !prevParsedDate[token]) {
      dateValues.push(prevParsedDate['YYYY'].slice(2, 4));
      continue;
    }

    dateValues.push(prevParsedDate[token]);
  }

  return dateValues;
}

function parseDate(date, dateKeys, separator) {
  const dateValues = date.split(separator);
  const parsedDate = {};

  for (let i = 0; i < dateKeys.length; i++) {
    parsedDate[dateKeys[i]] = dateValues[i];
  }

  return parsedDate;
}

module.exports = formatDate;
