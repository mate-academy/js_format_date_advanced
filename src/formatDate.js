'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const delimiters = ['-', '/', '.'];
  const inputDelimiter = delimiters.find((d) => date.includes(d));
  const dateParts = date.split(inputDelimiter);

  const dateObj = {};

  fromFormat.forEach((part, index) => {
    dateObj[part] = dateParts[index];
  });

  if (dateObj['YYYY'] && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(2);
  } else if (dateObj['YY'] && toFormat.includes('YYYY')) {
    const year = parseInt(dateObj['YY'], 10);

    dateObj['YYYY'] = year < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY'];
  }

  let outputDelimiter = '-';

  if (toFormat.includes('/')) {
    outputDelimiter = '/';
  } else if (toFormat.includes('.')) {
    outputDelimiter = '.';
  }

  const newDate = toFormat.map((part) => dateObj[part]).join(outputDelimiter);

  return newDate.slice(0, -1);
}

module.exports = formatDate;
