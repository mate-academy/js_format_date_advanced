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
  const newFormatSeparator = toFormat[3];

  const toFormatParts = toFormat.slice(0, 3);

  const dateStringParts = date.split(fromSeparator);

  let year = '';
  let month = '';
  let day = '';

  fromFormat.forEach((part, index) => {
    switch (part) {
      case 'YYYY':
      case 'YY':
        year = dateStringParts[index];
        break;
      case 'MM':
        month = dateStringParts[index];
        break;
      case 'DD':
        day = dateStringParts[index];
        break;
    }
  });

  if (toFormatParts.includes('YYYY')) {
    if (year.length === 2) {
      year = Number(year) < 30 ? '20' + year : '19' + year;
    }
  }

  if (toFormatParts.includes('YY')) {
    year = year.length === 4 ? year.slice(2) : year;
  }

  const formattedDateParts = toFormatParts.map((part) => {
    switch (part) {
      case 'YYYY':
      case 'YY':
        return year;
      case 'MM':
        return month;
      case 'DD':
        return day;
    }
  });

  return formattedDateParts.join(newFormatSeparator);
}

module.exports = formatDate;
