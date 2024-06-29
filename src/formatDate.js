'use strict';

/**
 * @param {string} date            //  1999-09-21
 * @param {string[]} fromFormat    //  YYYY MM DD -
 * @param {string[]} toFormat      //  MM DD YY .
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[fromFormat.length - 1]);
  let yearIndex = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i][0] === 'Y') {
      yearIndex = i;
      break;
    }
  }

  const year = parseInt(parts[yearIndex]);
  const month = parseInt(parts[fromFormat.indexOf('MM')]);
  const day = parseInt(parts[fromFormat.indexOf('DD')]);

  let shortYear = year % 100;

  if (shortYear === 0) {
    shortYear = '00';
  }

  const formattedYear = shortYear < 30 ? `20${shortYear}` : `19${shortYear}`;

  const newDateParts = toFormat.map((formatPart) => {
    switch (formatPart) {
      case 'YYYY':
        return formattedYear.toString();
      case 'YY':
        return shortYear.toString();
      case 'MM':
        return month.toString().padStart(2, '0');
      case 'DD':
        return day.toString().padStart(2, '0');
    }
  });

  const result = `${newDateParts[0]}${toFormat[3]}${newDateParts[1]}${toFormat[3]}${newDateParts[2]}`;

  return result;
}

module.exports = formatDate;
