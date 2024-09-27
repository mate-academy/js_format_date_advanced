'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];
  const formattedDate = [];
  let year;
  let month;
  let day;
  const splittedDate = date.split(separator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = splittedDate[i];
        break;
      case 'MM':
        month = splittedDate[i];
        break;
      case 'DD':
        day = splittedDate[i];
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
      case 'YYYY':
        if (fromFormat[i] === 'YYYY' && toFormat[i] === 'YY') {
          const secondHalfIndex = 2;

          year = year.slice(secondHalfIndex);
        }

        if (fromFormat[i] === 'YY' && toFormat[i] === 'YYYY') {
          const secondHalfYear = 30;
          const previousPrefixYear = '19';
          const currentPrefixYear = '20';

          if (year >= secondHalfYear) {
            year = `${previousPrefixYear}${year}`;
          } else {
            year = `${currentPrefixYear}${year}`;
          }
        }
        formattedDate.push(year);
        break;
      case 'MM':
        formattedDate.push(month);
        break;
      case 'DD':
        formattedDate.push(day);
        break;
      default:
        break;
    }
  }

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
