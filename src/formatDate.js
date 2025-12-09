'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const [part1, part2, part3, separator] = fromFormat;
  const dateParts = date.split(separator);
  const outputSeparator = toFormat[toFormat.length - 1];

  const dateMap = {
    [part1]: dateParts[0],
    [part2]: dateParts[1],
    [part3]: dateParts[2],
  };

  const year = dateMap['YY'] || dateMap['YYYY'];

  for (let i = 0; i < toFormat.length - 1; i += 1) {
    switch (toFormat[i]) {
      case 'DD':
        newDate[i] = dateMap['DD'];
        break;

      case 'MM':
        newDate[i] = dateMap['MM'];
        break;

      case 'YY':
        newDate[i] = year.length === 4 ? year.slice(-2) : year;
        break;

      case 'YYYY':
        newDate[i] = year.length === 2 ? convertYear(year) : year;
        break;
    }
  }

  return newDate.join(outputSeparator);
}

function convertYear(year) {
  if (year.length === 2) {
    if (year < 30) {
      return `20${year}`;
    } else {
      return `19${year}`;
    }
  }
}

module.exports = formatDate;
