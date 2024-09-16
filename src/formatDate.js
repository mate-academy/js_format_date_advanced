'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatSeparator = fromFormat[fromFormat.length - 1];
  const dateInCurrentFormat = date.split(fromFormatSeparator);
  const currentDate = {};

  for (let i = 0; i < dateInCurrentFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      currentDate.year = dateInCurrentFormat[i];
    }

    if (fromFormat[i] === 'YY') {
      currentDate.year = Number(dateInCurrentFormat[i]) < 30
        ? '20' + dateInCurrentFormat[i]
        : '19' + dateInCurrentFormat[i];
    }

    currentDate[fromFormat[i]] = dateInCurrentFormat[i];
  }

  const dateInToFormat = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        dateInToFormat[i] = currentDate.year;
        break;
      case 'YY':
        dateInToFormat[i] = currentDate.year.slice(-2);
        break;
      case 'MM':
        dateInToFormat[i] = currentDate[toFormat[i]];
        break;
      case 'DD':
        dateInToFormat[i] = currentDate[toFormat[i]];
        break;
    }
  }

  const toFormatSeparator = toFormat[toFormat.length - 1];

  return dateInToFormat.join(toFormatSeparator);
}

module.exports = formatDate;
