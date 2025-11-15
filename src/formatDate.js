'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const extractedDate = {
    year: null,
    month: null,
    day: null,
  };
  const separatedUnits = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        extractedDate.year = separatedUnits[i];
        break;
      case 'MM':
        extractedDate.month = separatedUnits[i];
        break;
      case 'DD':
        extractedDate.day = separatedUnits[i];
        break;
      default:
        throw new Error('Unsupported date format');
    }
  }

  const formattedDate = [];

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (extractedDate.year.length === 2) {
          if (extractedDate.year < 30) {
            formattedDate.push('20' + extractedDate.year);
          } else {
            formattedDate.push('19' + extractedDate.year);
          }
        } else {
          formattedDate.push(extractedDate.year);
        }
        break;
      case 'YY':
        if (extractedDate.year.length === 4) {
          formattedDate.push(extractedDate.year.slice(2));
        } else {
          formattedDate.push(extractedDate.year);
        }
        break;
      case 'MM':
        formattedDate.push(extractedDate.month);
        break;
      case 'DD':
        formattedDate.push(extractedDate.day);
        break;
      default:
        throw new Error('Unsupported date format');
    }
  }

  return formattedDate.join(toFormat[3]);
}
module.exports = formatDate;
