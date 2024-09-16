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
  const toSeparator = toFormat[3];
  const fromFormatArray = date.split(fromSeparator);

  const dateMap = {};

  fromFormat.forEach((element, index) => {
    switch (element) {
      case 'YY':
        dateMap.yy = fromFormatArray[index];
        break;
      case 'YYYY':
        dateMap.yy = fromFormatArray[index];
        break;
      case 'MM':
        dateMap.mm = fromFormatArray[index];
        break;
      case 'DD':
        dateMap.dd = fromFormatArray[index];
    }
  });

  const resultArray = [];

  toFormat.forEach(element => {
    switch (element) {
      case 'YYYY':
        resultArray.push(formatYear(element, dateMap.yy));
        break;
      case 'YY':
        resultArray.push(formatYear(element, dateMap.yy));
        break;
      case 'MM':
        resultArray.push(dateMap.mm);
        break;
      case 'DD':
        resultArray.push(dateMap.dd);
        break;
    }
  });

  return resultArray.join(toSeparator);
}

function formatYear(format, year) {
  const century = (year < 30) ? 20 : 19;

  if (year.length === 4 && format.length === 2) {
    return year.slice(2);
  }

  if (year.length === 2 && format.length === 4) {
    return century + year;
  }

  return year;
}

module.exports = formatDate;
