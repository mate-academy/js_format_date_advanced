'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();

  const dateParts = date.split(separatorFrom);

  let year, month, day;

  fromFormat.forEach((part, index) => {
    if (part === 'YYYY' || part === 'YY') {
      year = dateParts[index];
    } else if (part === 'MM') {
      month = dateParts[index];
    } else if (part === 'DD') {
      day = dateParts[index];
    }
  });

  const convertYear = (inputYear, targetFormat) => {
    if (targetFormat === 'YYYY') {
      if (inputYear.length === 2) {
        return Number(inputYear) < 30 ? '20' + inputYear : '19' + inputYear;
      }

      return inputYear;
    } else if (targetFormat === 'YY') {
      return inputYear.length === 4 ? inputYear.slice(-2) : inputYear;
    }
  };

  if (toFormat.includes('YYYY') && year.length === 2) {
    year = convertYear(year, 'YYYY');
  } else if (toFormat.includes('YY') && year.length === 4) {
    year = convertYear(year, 'YY');
  }

  const newDateParts = toFormat.map((part) => {
    if (part === 'YYYY' || part === 'YY') {
      return year;
    }

    if (part === 'MM') {
      return month;
    }

    if (part === 'DD') {
      return day;
    }
  });

  return newDateParts.join(separatorTo);
}

module.exports = formatDate;
