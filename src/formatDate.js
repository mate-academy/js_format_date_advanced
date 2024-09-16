'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldFormatDelimiter = getDateDelimiter(fromFormat);
  const newFormatDelimiter = getDateDelimiter(toFormat);
  const oldDateArray = date.split(oldFormatDelimiter);
  const newDateArray = [];

  const dateObj = {
    get year() {
      return this.YY || this.YYYY;
    },
  };

  for (let i = 0; i < oldDateArray.length; i++) {
    dateObj[fromFormat[i]] = oldDateArray[i];
  }

  for (let i = 0; i < oldDateArray.length; i++) {
    const dateKey = toFormat[i];
    const hasCorrectYearFormat = Object.prototype.hasOwnProperty
      .call(dateObj, dateKey);

    if (!hasCorrectYearFormat) {
      const convertedYear = changeYearFormat(dateKey, dateObj.year);

      newDateArray.push(convertedYear);
    } else {
      newDateArray.push(dateObj[dateKey]);
    }
  }

  return newDateArray.join(newFormatDelimiter);
}

function getDateDelimiter(dateFormat) {
  return dateFormat.splice(dateFormat.length - 1).join('');
}

function changeYearFormat(currentFormat, currentYear) {
  let convertedYear = '';

  switch (currentFormat) {
    case 'YYYY':
      convertedYear = currentYear < 30
        ? `20${currentYear}`
        : `19${currentYear}`;
      break;

    case 'YY':
      convertedYear = currentYear.split('').splice(2).join('');
      break;
  }

  return convertedYear;
}

module.exports = formatDate;
