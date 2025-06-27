'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.at(-1);
  const newSeparator = toFormat.at(-1);

  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);
  const dateValues = date.split(oldSeparator);

  const dateObj = {};

  for (let index = 0; index < fromParts.length; index++) {
    dateObj[fromFormat[index]] = dateValues[index];
  }

  if (fromFormat.includes('YYYY')) {
    dateObj['YY'] = dateObj['YYYY'].split('').slice(-2).join('');
  } else {
    if (dateObj['YY'] < 30) {
      dateObj['YYYY'] = '20' + dateObj['YY'];
    } else {
      dateObj['YYYY'] = '19' + dateObj['YY'];
    }
  }

  if (!dateObj['YY'] && dateObj['YYYY']) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  if (!dateObj['YYYY'] && dateObj['YY']) {
    const yy = parseInt(dateObj['YY']);

    dateObj['YYYY'] = yy < 30 ? '20' + yy : '19' + yy;
  }

  return toParts.map((part) => dateObj[part]).join(newSeparator);
}

module.exports = formatDate;
