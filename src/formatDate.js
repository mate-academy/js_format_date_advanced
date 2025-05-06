'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArray = date.split(oldSeparator);
  const formats = fromFormat.reduce((acc, value, i) => {
    if (value.length > 1) {
      acc[value] = dateArray[i];
    }

    return acc;
  }, {});

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = formats['YY'];

    formats['YYYY'] = +year < 30 ? '20' + year : '19' + year;
    delete formats['YY'];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const year = formats['YYYY'];

    formats['YY'] = year.slice(-2);
  }

  const newDate = toFormat
    .filter((part) => part.length > 1)
    .map((part) => formats[part]);

  return newDate.join(newSeparator);
}

module.exports = formatDate;
