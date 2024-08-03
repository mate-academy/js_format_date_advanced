'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , fromSeparator] = fromFormat;
  const [, , , toSeparator] = toFormat;

  const dateParts = date.split(fromSeparator);

  const formatIndex = {
    YYYY: -1,
    YY: -1,
    MM: -1,
    DD: -1,
  };

  fromFormat.forEach((part, index) => {
    if (formatIndex.hasOwnProperty(part)) {
      formatIndex[part] = index;
    }
  });

  const yearPart = dateParts[formatIndex['YYYY']];
  const monthPart = dateParts[formatIndex['MM']];
  const dayPart = dateParts[formatIndex['DD']];
  const year2Part = dateParts[formatIndex['YY']];

  const convertYear = (year) => {
    if (year.length === 2) {
      return year < 30 ? `20${year}` : `19${year}`;
    } else {
      return year.slice(-2);
    }
  };

  const newDateParts = toFormat.map((part) => {
    switch (part) {
      case 'YYYY':
        return formatIndex['YY'] !== -1 ? convertYear(year2Part) : yearPart;
      case 'YY':
        return formatIndex['YYYY'] !== -1 ? convertYear(yearPart) : year2Part;
      case 'MM':
        return monthPart;
      case 'DD':
        return dayPart;
      default:
        return '';
    }
  });

  return newDateParts.filter((part) => part !== '').join(toSeparator);
}

module.exports = formatDate;
