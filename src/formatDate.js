'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat.at(-1);
  const toSep = toFormat.at(-1);
  const dateParts = date.split(fromSep);
  const parseDate = {};
  const formattedDate = [];

  for (let i = 0; i < dateParts.length; i++) {
    parseDate[fromFormat[i]] = dateParts[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === toSep) {
      continue;
    }

    const key = toFormat[i];

    if (key === 'YY' && parseDate['YYYY']) {
      formattedDate.push(parseDate['YYYY'].slice(-2));
    } else if (key === 'YYYY' && parseDate['YY']) {
      const year = +parseDate['YY'];

      if (year < 30) {
        formattedDate.push(year + 2000);
      } else {
        formattedDate.push(year + 1900);
      }
    } else {
      formattedDate.push(parseDate[key]);
    }
  }

  return formattedDate.join(toSep);
}

module.exports = formatDate;
