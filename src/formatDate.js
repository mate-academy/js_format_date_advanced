'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const toSeparator = toFormat[toFormat.length - 1];
  const fromSeperator = fromFormat[fromFormat.length - 1];
  const dateArray = date.split(fromSeperator);
  let dateYear;
  let dateMonth;
  let dateDay;
  const dateOutput = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        dateYear = dateArray[i];
        break;

      case 'YY':
        dateYear = dateArray[i];
        break;

      case 'MM':
        dateMonth = dateArray[i];
        break;

      case 'DD':
        dateDay = dateArray[i];
        break;

      default:
        Error('Invalid date format');
    }
  }

  if (dateYear.length === 2) {
    if (parseInt(dateYear) < 30) {
      dateYear = `20${dateYear}`;
    } else {
      dateYear = `19${dateYear}`;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        dateOutput[dateOutput.length] = dateYear;
        break;

      case 'YY':
        dateOutput[dateOutput.length] = dateYear.slice(2);
        break;

      case 'MM':
        dateOutput[dateOutput.length] = dateMonth;
        break;

      case 'DD':
        dateOutput[dateOutput.length] = dateDay;
        break;

      default:
        Error('Invalid date format');
    }
  }

  return dateOutput.join(toSeparator);
}

module.exports = formatDate;
