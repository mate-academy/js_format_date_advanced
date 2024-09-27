'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const partMap = {};

  fromFormat.forEach((part, index) => {
    partMap[part] = index;
  });

  const dateParts = date.split(
    fromFormat.find(
      part => part !== 'YYYY' && part !== 'YY' && part !== 'MM' && part !== 'DD'
    )
  );

  let year = dateParts[partMap['YYYY']] || dateParts[partMap['YY']];
  const month = dateParts[partMap['MM']];
  const day = dateParts[partMap['DD']];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(-2);
  };

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    year = parseInt(year, 10);

    if (year < 10) {
      year = '200' + year;
    } else if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  const timeSeparator = toFormat.find(
    part => part !== 'YYYY' && part !== 'YY' && part !== 'MM' && part !== 'DD'
  ) || '';

  const reorderedDateParts = toFormat.map(part => {
    if (part === 'YYYY') {
      return year;
    };

    if (part === 'YY' && !year.includes('YY')) {
      return year.slice(-2);
    };

    if (part === 'MM') {
      return month;
    };

    if (part === 'DD') {
      return day;
    };

    return part;
  });

  const newDate = reorderedDateParts.join(timeSeparator);

  return newDate.slice(0, -2);
}

module.exports = formatDate;
