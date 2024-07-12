'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const inputDelimiter = fromFormat.find((char) => {
    return ['-', '/', '.'].includes(char);
  });

  const dateParts = date.split(inputDelimiter);

  const dateObj = {};

  fromFormat.forEach((part, index) => {
    if (part !== inputDelimiter) {
      dateObj[part] = dateParts[index];
    }
  });

  if (dateObj['YYYY'] && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(2);
  } else if (dateObj['YY'] && toFormat.includes('YYYY')) {
    const year = parseInt(dateObj['YY'], 10);

    dateObj['YYYY'] = year < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY'];
  }

  const outputDelimiter = toFormat.find(
    (char) => ['-', '/', '.'].includes(char) || '',
  );

  const newDate = toFormat
    .filter((part) => part !== outputDelimiter)
    .map((part) => dateObj[part])
    .join(outputDelimiter);

  return newDate;
}

module.exports = formatDate;
